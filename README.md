# Decentralized Exchange FastAPI

This project implements a decentralized exchange (DEX) backend using FastAPI. It allows users to create, view, and manage orders for trading cryptocurrencies in a peer-to-peer manner.

## Features

- Create limit orders (buy/sell)
- View all active orders
- Match orders based on price and quantity
- Execute trades
- Simple in-memory database for demonstration purposes

## Technologies Used

- FastAPI: High-performance web framework for building APIs with Python 3.7+
- Uvicorn: ASGI server for running FastAPI applications
- Pydantic: Data validation and settings management using Python type hints

## Setup

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

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```   (Note: You might need to create a `requirements.txt` file first if it doesn't exist. You can generate one using `pip freeze > requirements.txt` after installing dependencies)

## Usage

1. Run the FastAPI application:

   ```bash
   uvicorn main:app --reload
   ```

2. Access the API documentation:

   Once the server is running, you can access the interactive API documentation (Swagger UI) at `http://127.0.0.1:8000/docs`.

## API Endpoints

- **POST /orders/**: Create a new order
- **GET /orders/**: Get all active orders
- **GET /orders/{order_id}**: Get a specific order by ID
- **POST /match/**: Manually trigger order matching (or implement automatic matching)

## Project Structure

- `main.py`: Main application entry point
- `routes/`: Defines API endpoints
- `models/`: Pydantic models for request/response data
- `repository/`: Handles data storage and retrieval (in-memory in this demo)
- `controllers/`: Contains business logic for order management
- `db.py`: Database setup (in-memory dictionary in this demo)
- `config.py`: Configuration settings

