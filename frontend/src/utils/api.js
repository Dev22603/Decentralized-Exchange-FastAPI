import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://127.0.0.1:8000",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAssets = async () => {
	const response = await apiClient.get("/api/get_assets");
	return response.data;
};

const tradeAsset = async (tradeType, amount, currency) => {
	const endpoint = tradeType === "buy" ? "/api/buy_eth" : "/api/sell_eth";
	const payload = tradeType === "buy" ? { amount, currency } : { amount };
	const response = await apiClient.post(endpoint, payload);
	return response.data;
};

const getUSDTAmount = async (amount) => {
	const response = await apiClient.get("/api/get_usdt_amount", {
		params: { amount },
	});
	return response.data;
};
const getEthAmount = async (amount) => {
	try {
		const response = await apiClient.get("/api/get_eth_amount", {
			params: { amount },
		});

		return response.data;
	} catch (error) {
		// Handle authentication errors
		if (error.response?.status === 401) {
			console.error("Authentication failed. Please log in again.");
			// Optional: redirect to login or trigger re-authentication
			window.location.href = "/login"; // or use your router
		}
		throw error;
	}
};

const getEthBalance = async () => {
	const response = await apiClient.get("/api/get_eth_balance");
	return response.data;
};
const getUsdtBalance = async () => {
	const response = await apiClient.get("/api/get_usdt_balance");
	return response.data;
};
const getTransactions = async () => {
	const response = await apiClient.get("/api/get_transactions");
	return response.data;
};
const deposit = async (amount) => {
	const response = await apiClient.post("/api/account/deposit_usdt", {
		amount,
	});
	return response.data;
};
export {
	apiClient,
	getAssets,
	tradeAsset,
	getUSDTAmount,
	getEthAmount,
	getEthBalance,
	getUsdtBalance,
	getTransactions,
	deposit,
};
