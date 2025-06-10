Technical Implementation
Architecture & Development Approach
During the development of this project, I focused on building a dynamic and modular architecture that leverages React's component-based paradigm. The codebase is structured to maximize maintainability and extensibility through strategic component decomposition and separation of concerns.
Key Technical Decisions
Component Architecture: The application follows a functional component approach with React Hooks for state management, ensuring optimal performance and code readability.
Reusable Logic: Repetitive operations are abstracted into custom utility functions and potential custom hooks, maintaining DRY principles and improving code maintainability.
Styling Strategy: Instead of traditional CSS files, I implemented Bootstrap 5 as the primary styling framework, enabling rapid responsive design implementation while maintaining a modern, professional appearance.
Enhanced User Experience: FontAwesome icon library integration provides intuitive visual cues and enhances the overall user interface, making the application more accessible and user-friendly.
Technical Stack

Frontend Framework: React 18+ with functional components
HTTP Client: Axios for robust API communication
UI Framework: Bootstrap 5 for responsive design
Icons: FontAwesome React integration
State Management: React Hooks (useState, useEffect)

Design Differences from Original Site
The design implementation intentionally deviates from the original site to better align with environmental sustainability themes. The color palette emphasizes green and white tones, creating a visual connection to nature and eco-consciousness.
Visual Enhancements
Color Scheme:

Primary: #20AC6B 
Background: #1F1F1F
Accent: #CBF6E2 

Image Integration: Since the original API doesn't provide container images, I incorporated a representative skip container image to create a more complete and visually appealing user experience. This addition helps users better understand the product offerings and creates a more professional presentation.
Getting Started
Prerequisites

Installation & Setup

# 1. Clone the repository to your local machine
git clone https://github.com/mfatih000/rem-waste.git
cd rem-waste

# 2. Install all required dependencies
npm install

# 3. Start the development server
npm start

# 4. Open your browser and navigate to:
# http://localhost:3000

Development Features
State Management

Container Data: Managed through useState with API integration
Modal State: Controlled component state for detail views
Cart Management: Single-selection cart with toggle functionality
Loading States: User feedback during API operations

Performance Optimizations

Efficient Re-renders: Strategic use of React Hooks
Image Optimization: Responsive image sizing
API Error Handling: Graceful degradation on network failures

Responsive Design

Mobile-First: Bootstrap's responsive grid system
Touch-Friendly: Optimized button sizes and interactions
Cross-Browser: Compatible with modern browsers

This implementation demonstrates modern React development practices while maintaining clean, scalable code architecture.