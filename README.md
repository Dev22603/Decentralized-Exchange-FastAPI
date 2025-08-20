# Decentralized Exchange — Full Stack Monorepo

A decentralized exchange (DEX) project with a FastAPI backend and a modern React frontend with SuperTokens authentication.

---

## 📦 Project Structure

```
.
├── backend/        # FastAPI backend (Python)
│   ├── main.py
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/       # React frontend (JS/TS)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md       # Project overview (this file)
```

---

## 🏦 Backend (FastAPI)
- **Stack**: FastAPI, Uvicorn, Pydantic, Python 3.7+
- **Key files/dirs**:
  - `main.py`: FastAPI app entrypoint
  - `controllers/`: Business logic (e.g., `controller.py`)
  - `models/`: Data models (`user.py`, `requests.py`)
  - `repository/`, `routes/`, `db.py`, `config.py`
- **Features**:
  - Create/view/manage orders (buy/sell)
  - Order matching & trade execution
  - In-memory DB for demo purposes
- **API endpoints**: `/orders/`, `/match/`, etc.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/decentralized-exchange-fastAPI.git
   cd decentralized-exchange-fastAPI
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI app:
   ```bash
   uvicorn main:app --reload
   ```
5. Visit the API docs at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 💻 Frontend (React + SuperTokens)
- **Stack**: React 19, Tailwind CSS, SuperTokens, Vite, React Router, Axios
- **Key files/dirs**:
  - `src/App.jsx`: Main app, routing, SuperTokens integration
  - `src/pages/`: `DashboardPage.jsx`, `AccountPage.jsx`
  - `src/components/`: Navbar, AccountInfo, TradeWidget, etc.
  - `src/services/api.js`: API calls
  - `index.css`, Tailwind config
- **Features**:
  - Modern, dark-mode UI
  - Dashboard, account management, trading interface
  - SuperTokens social login & session management
  - Responsive & accessible design

### Prerequisite: Start SuperTokens Core (Docker)
Before running the frontend, start the SuperTokens core service:
```bash
docker run -p 3567:3567 -d registry.supertokens.io/supertokens/supertokens-postgresql:latest
```
This is required for authentication to work properly.

### Frontend Setup
1. Go to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   The app will typically be available at [http://localhost:5173](http://localhost:5173).

#### Customization
- Update backend logic in `controllers/`, `models/`, `routes/`
- Update frontend UI in `src/pages/`, `src/components/`
- SuperTokens config in `App.jsx` and related files

---

## 🤝 Contributing
- Follow code style and patterns in each directory
- Use Tailwind CSS for frontend styling
- Ensure responsive and accessible design
- Add proper error handling and test on multiple devices

---

## 📄 License
This project is part of a DeFi exchange application.

## Backend Setup

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

## Frontend Setup

The frontend is built with **React** and uses **SuperTokens** for authentication (social login, session management, etc.).

### Prerequisite: Start SuperTokens Core (Docker)

Before running the frontend locally, you must start the SuperTokens core service using Docker:

```bash
# Start the SuperTokens PostgreSQL core service
# This runs the service on port 3567

docker run -p 3567:3567 -d registry.supertokens.io/supertokens/supertokens-postgresql:latest
```

This is required for authentication to work properly.

### Frontend Installation & Usage
1. Go to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173` (the default Vite port).

#### Key Technologies
- **React**: For building the user interface
- **SuperTokens**: For authentication (social login, session management)
- **react-router-dom**: For routing

#### Main Features
- Modern dark-mode UI, responsive design
- Account management & trading interface
- Secure authentication and protected routes

#### Customization
- Update components in `frontend/src/pages/` to modify dashboard or account features.
- Authentication UI and logic can be customized in `frontend/src/App.jsx` and related SuperTokens configuration files.



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

   ```

## Usage

1. Run the FastAPI application:

   ```bash
   uvicorn main:app --reload
   ```
2. Access the API documentation:

   Once the server is running, you can access the interactive API documentation (Swagger UI) at `http://127.0.0.1:8000/docs`.

## API Endpoints

- **POST /buy_eth**: Buy ETH with specified amount and currency (requires authentication)
- **POST /sell_eth**: Sell ETH for specified amount and currency (requires authentication)
- **GET /get_assets**: Retrieve user's asset balances (requires authentication)
- **GET /get_eth_amount?amount=**: Get ETH equivalent for a given amount (requires authentication)
- **POST /account/deposit_usdt**: Deposit USDT to user account (requires authentication)


## Project Structure

- `main.py`: Main application entry point
- `routes/`: Defines API endpoints
- `models/`: Pydantic models for request/response data
- `repository/`: Handles data storage and retrieval (in-memory in this demo)
- `controllers/`: Contains business logic for order management
- `db.py`: Database setup (in-memory dictionary in this demo)
- `config.py`: Configuration settings
