import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Only add response interceptor for session handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Session expired or invalid');
            // Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getAssets = async () => {
	const response = await apiClient.get("/get_assets");
	return response.data;
};

export const tradeAsset = async (tradeType, amount, currency) => {
	const endpoint = tradeType === "buy" ? "/buy_eth" : "/sell_eth";
	const payload = tradeType === "buy" ? { amount, currency } : { amount };
	const response = await apiClient.post(endpoint, payload);
	return response.data;
};

export const getUSDTAmount = async (amount) => {
	const response = await apiClient.get("/get_usdt_amount", { params: { amount } });
	return response.data;
};
export const getEthAmount = async (amount) => {
    try {
      
      const response = await apiClient.get("/get_eth_amount", {
        params: { amount },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      return response.data;
    } catch (error) {
      // Handle authentication errors
      if (error.response?.status === 401) {
        console.error('Authentication failed. Please log in again.');
        // Optional: redirect to login or trigger re-authentication
        window.location.href = '/login'; // or use your router
      }
      throw error;
    }
  };
  

export const getEthBalance = async () => {
	const response = await apiClient.get("/get_eth_balance");
	return response.data;
};
export const getUsdtBalance = async () => {
	const response = await apiClient.get("/get_usdt_balance");
	return response.data;
};
export const getTransactions = async () => {
	const response = await apiClient.get("/get_transactions");
	return response.data;
};
export const deposit = async (amount) => {
	const response = await apiClient.post("/account/deposit_usdt", { amount });
	return response.data;
};