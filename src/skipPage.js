import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import skip from './assets/skip.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        document.body.style.background = '#1F1F1F';
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';

        return () => {
            document.body.style.background = null;
            document.body.style.minHeight = null;
            document.body.style.margin = null;
        };
    }, []);

    useEffect(() => {
        axios
            .get('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const openModal = (item) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);

    const toggleCartItem = (item) => {
        const exists = cart.find((i) => i.id === item.id);

        if (exists) {
            setCart([]);
        } else {
            setCart([item]);
        }
    };
const resetCart = () => {
  setCart([]);
};


    const totalPrice = cart.reduce((sum, item) => {
        return sum + item.price_before_vat * (1 + item.vat / 100);
    }, 0);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <div
                className="container"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                }}
            >
                <div className="text-center mb-4">
                    <h1
                        className="display-4 mb-2"
                        style={{
                            fontWeight: 'bold',
                            color: '#20AC6B',
                        }}
                    >
                        Waste Containers
                    </h1>
                    <h2
                        className="lead mb-3"
                        style={{
                            opacity: 0.85,
                            color: '#20AC6B',
                        }}
                    >
                        <b>"Rent One, Save Many"</b>
                    </h2>
                    <h5
                        className="lead"
                        style={{
                            opacity: 0.75,
                            color: '#CBF6E2',
                        }}
                    >
                        Select the skip size that best suits your needs
                    </h5>
                </div>

                {isLoading ? (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-success mb-3"
                            role="status"
                            style={{ width: '3rem', height: '3rem' }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="h5 text-muted">Loading containers...</p>
                    </div>
                ) : (
                    <div className="row">
                        {data.map((item) => {
                            const inCart = cart.find((i) => i.id === item.id);
                            return (
                                <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                    <div
                                        className="card h-100 shadow-sm border-0"
                                        style={{
                                            backgroundColor: '#f8f9f8',
                                            borderRadius: '0.75rem',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                            e.currentTarget.style.boxShadow =
                                                '0 10px 20px rgba(0, 128, 0, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <div
                                            onClick={() => openModal(item)}
                                            className="card-body text-center"
                                        >
                                            <img
                                                src={skip}
                                                alt="Skip"
                                                className="card-img-top img-fluid mb-3"
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    maxHeight: '180px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <h4 className="card-title mb-2" style={{ color: '#2E7D32' }}>
                                                {item.size} Yard Skip
                                            </h4>

                                            <p className="mb-1 text-muted">
                                                Hire Period: {item.hire_period_days} days
                                            </p>
                                            <h5 className="mb-3" style={{ color: '#4CAF50' }}>
                                                £
                                                {(item.price_before_vat * (1 + item.vat / 100)).toFixed(2)}
                                            </h5>

                                            <div className="d-flex justify-content-center gap-2 mb-3">
                                                <span
                                                    className={`badge ${item.allowed_on_road ? 'bg-success' : 'bg-secondary'
                                                        }`}
                                                    style={{ fontSize: '0.75rem' }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            item.allowed_on_road
                                                                ? ['fas', 'check']
                                                                : ['fas', 'xmark']
                                                        }
                                                        className="me-1"
                                                    />
                                                    Road
                                                </span>
                                                <span
                                                    className={`badge ${item.allows_heavy_waste ? 'bg-success' : 'bg-secondary'
                                                        }`}
                                                    style={{ fontSize: '0.75rem' }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            item.allows_heavy_waste
                                                                ? 'fa-solid fa-feather-pointed'
                                                                : 'fa-solid fa-weight-hanging'
                                                        }
                                                    />
                                                </span>
                                            </div>

                                            <p
                                                className="text-decoration-underline mb-3"
                                                style={{ color: '#4CAF50', fontSize: '0.9rem' }}
                                            >
                                                Click here for detailed information
                                            </p>

                                            <button
                                                className={`btn w-100 fw-bold ${inCart ? 'btn-outline-success' : 'btn-success'
                                                    }`}
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    transition: 'all 0.2s ease',
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleCartItem(item);
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.filter = 'brightness(1.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.filter = 'brightness(1)';
                                                }}
                                            >
                                                {inCart ? 'Remove' : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


            {cart.length > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '320px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        backgroundColor: '#ffffff',
                        borderRadius: '1rem',
                        padding: '1rem',
                        zIndex: 1100,
                        color: '#333',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        border: '1px solid #ddd',
                    }}
                >
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h6 className="mb-3 fw-semibold text-muted">Selected Skip</h6>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={resetCart}
                                aria-label="Close"
                            ></button>
                        </div>

                        {cart.length === 0 && <p className="small text-muted">No skips selected.</p>}

                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center mb-2 small"
                            >
                                <div className="text-truncate">{item.size} Yard</div>
                                <div className="fw-bold">£{(item.price_before_vat * (1 + item.vat / 100)).toFixed(2)}</div>
                            </div>
                        ))}

                        {cart.length > 0 && (
                            <>
                                <hr />
                                <div className="d-flex justify-content-between fw-semibold">
                                    <div>Total:</div>
                                    <div>£{totalPrice.toFixed(2)}</div>
                                </div>
                                <button
                                    className="btn btn-success btn-sm w-100 mt-3 fw-semibold"
                                    style={{
                                        borderRadius: '0.5rem',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.filter = 'brightness(1.05)';
                                        e.target.style.transform = 'scale(1.03)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.filter = 'brightness(1)';
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                >
                                    Continue
                                </button>
                            </>
                        )}
                    </div>

                </div>
            )}

            {selectedItem && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.6)' }}
                        onClick={closeModal}
                    ></div>
                    <div
                        className="modal fade show d-block"
                        style={{ zIndex: 1050 }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div
                                className="modal-content border-0 shadow rounded-3"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: '#333',
                                }}
                            >
                                <div
                                    className="modal-header border-0"
                                    style={{
                                        backgroundColor: '#f0f0f0',
                                        borderTopLeftRadius: '1rem',
                                        borderTopRightRadius: '1rem',
                                    }}
                                >
                                    <h5 className="modal-title fw-semibold">{selectedItem.size} Yard Skip Details</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <div className="p-2 rounded bg-light">
                                                <small className="text-muted">Hire Period</small>
                                                <div className="fw-bold">{selectedItem.hire_period_days} days</div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-2 rounded bg-light">
                                                <small className="text-muted">Postcode</small>
                                                <div className="fw-bold">{selectedItem.postcode}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded bg-light mb-3">
                                        <small className="text-muted">Pricing</small>
                                        <div className="mt-2">
                                            <div className="d-flex justify-content-between small">
                                                <span>Before VAT:</span>
                                                <span className="fw-semibold">£{selectedItem.price_before_vat}</span>
                                            </div>
                                            <div className="d-flex justify-content-between small">
                                                <span>VAT ({selectedItem.vat}%):</span>
                                                <span className="fw-semibold">
                                                    £{(selectedItem.price_before_vat * selectedItem.vat / 100).toFixed(2)}
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold h6">
                                                <span>Total:</span>
                                                <span>£{(selectedItem.price_before_vat * (1 + selectedItem.vat / 100)).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center gap-2 mb-3">
                                        <div
                                            className={`p-2 rounded text-center w-50 small ${selectedItem.allowed_on_road ? 'bg-success text-white' : 'bg-secondary text-white'}`}
                                        >
                                            <span className="me-1">
                                                <FontAwesomeIcon icon={selectedItem.allowed_on_road ? 'fa-solid fa-check' : 'fa-solid fa-xmark'} />
                                            </span>
                                            Road Allowed
                                        </div>
                                        <div
                                            className={`p-2 rounded text-center w-50 small ${selectedItem.allows_heavy_waste ? 'bg-success text-white' : 'bg-secondary text-white'}`}
                                        >
                                            <span className="me-1">
                                                <FontAwesomeIcon icon={selectedItem.allows_heavy_waste ? 'fa-solid fa-feather-pointed' : 'fa-solid fa-weight-hanging'} />
                                            </span>
                                            {selectedItem.allows_heavy_waste ? 'Light' : 'Heavy'}
                                        </div>
                                    </div>

                                    <button
                                            className={`btn w-100 fw-bold  ${cart.find(i => i.id === selectedItem.id)? 'btn-outline-success' : 'btn-success'
                                                    }`}
                                        onClick={() => {
                                            toggleCartItem(selectedItem);
                                            closeModal();
                                        }}
                                    >
                                        {cart.find(i => i.id === selectedItem.id) ? 'Remove' : 'Select'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default App;
