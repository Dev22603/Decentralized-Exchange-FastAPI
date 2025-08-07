# DeFi Exchange Frontend

A modern, dark-mode decentralized exchange interface built with React, Tailwind CSS, and SuperTokens authentication.

## Features

### 🎨 Modern Dark Mode UI

- Complete dark theme with professional styling
- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive user interface

### 🧭 Navigation

- Clean navbar with logo and navigation links
- Easy switching between Trading and Account pages
- Mobile-responsive navigation menu
- Active page indicators

### 💼 Account Management

- Dedicated Account page with comprehensive overview
- Real-time balance display with visual indicators
- Transaction history with detailed information
- Quick actions for common tasks

### 💱 Trading Interface

- Intuitive swap interface with asset selection
- Real-time exchange rate display
- Fee calculation and transparency
- Balance integration with "Max" button
- Asset swap functionality

### 🔐 Authentication

- Secure authentication with SuperTokens
- Protected routes for authenticated users
- Seamless login/logout experience

## Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **SuperTokens** - Authentication solution
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. Build for production:
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── AccountInfo.jsx # Account balance display
│   ├── TradeWidget.jsx # Trading interface
│   └── LoadingSpinner.jsx # Loading states
├── pages/              # Page components
│   ├── DashboardPage.jsx # Main trading page
│   └── AccountPage.jsx   # Account management page
├── services/           # API services
│   └── api.js         # HTTP client configuration
└── index.css          # Global styles with Tailwind
```

## UI Components

### Design System

- **Colors**: Dark gray palette with blue accents
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable card, button, and input components

### Key Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Clear confirmation messages

## API Integration

The frontend integrates with the FastAPI backend for:

- User authentication
- Balance management
- Trading operations
- Transaction history

## Contributing

1. Follow the existing code style and patterns
2. Use Tailwind CSS for styling
3. Ensure responsive design
4. Add proper error handling
5. Test on multiple devices

## License

This project is part of a DeFi exchange application.
