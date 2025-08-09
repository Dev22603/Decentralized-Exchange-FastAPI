# Decentralized Exchange (DEX) Platform

This project implements a decentralized exchange platform with a React frontend and FastAPI backend. It allows users to create, view, and manage orders for trading cryptocurrencies in a peer-to-peer manner.

## Features

### Backend
- Create limit orders (buy/sell)
- View all active orders
- Match orders based on price and quantity
- Execute trades
- Simple in-memory database for demonstration purposes

### Frontend
- Responsive user interface with TailwindCSS
- Real-time order book visualization
- Trade execution interface
- Account management
- Secure authentication with SuperTokens

## Technologies Used

### Backend
- FastAPI: High-performance web framework for building APIs with Python 3.7+
- Uvicorn: ASGI server for running FastAPI applications
- Pydantic: Data validation and settings management using Python type hints

### Frontend
- React 19: JavaScript library for building user interfaces
- Vite: Next Generation Frontend Tooling
- TailwindCSS: Utility-first CSS framework
- React Router: Client-side routing
- Axios: Promise-based HTTP client
- SuperTokens: Open-source authentication solution

## Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/decentralized-exchange-fastAPI.git
   cd decentralized-exchange-fastAPI
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   (Note: If requirements.txt doesn't exist, generate it using `pip freeze > requirements.txt` after installing dependencies)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Usage

### Backend

1. Run the FastAPI application:
   ```bash
   # From the project root directory
   uvicorn main:app --reload
   ```

2. Access the API documentation:
   - Swagger UI: `http://127.0.0.1:8000/docs`
   - ReDoc: `http://127.0.0.1:8000/redoc`

### Frontend

1. Start the development server:
   ```bash
   # From the frontend directory
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## API Endpoints

- **POST /orders/**: Create a new order
- **GET /orders/**: Get all active orders
- **GET /orders/{order_id}**: Get a specific order by ID
- **POST /match/**: Manually trigger order matching (or implement automatic matching)

## Project Structure

### Backend
- `main.py`: Main application entry point
- `routes/`: Defines API endpoints
- `models/`: Pydantic models for request/response data
- `repository/`: Handles data storage and retrieval (in-memory in this demo)
- `controllers/`: Contains business logic for order management
- `db.py`: Database setup (in-memory dictionary in this demo)
- `config.py`: Configuration settings

### Frontend
- `src/`: Source code
  - `App.jsx`: Main application component
  - `main.jsx`: Entry point
  - `index.css`: Global styles
  - `components/`: Reusable UI components
    - `AccountInfo.jsx`: User account information
    - `LoadingSpinner.jsx`: Loading indicator
    - `Navbar.jsx`: Navigation bar
    - `TradeWidget.jsx`: Trading interface
  - `pages/`: Page components
    - `AccountPage.jsx`: User account management
    - `DashboardPage.jsx`: Main trading dashboard
  - `services/`: API services
    - `api.js`: API client configuration
  - `utils/`: Utility functions
    - `api.js`: API helper functions

