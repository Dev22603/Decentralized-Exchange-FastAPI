import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:8000", // Adjust this to your backend URL
	withCredentials: true,
});

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
