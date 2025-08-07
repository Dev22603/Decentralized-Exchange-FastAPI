import React, { useState, useEffect, useCallback } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getAssets, tradeAsset } from "../utils/api";
import { MdSwapVert } from "react-icons/md";

const TradeWidget = () => {
	const { doesSessionExist } = useSessionContext();
	const [activeTab, setActiveTab] = useState("buy");
	const [inputAmount, setInputAmount] = useState("0.0");
	const [outputAmount, setOutputAmount] = useState("");
	const [inputCurrency, setInputCurrency] = useState("ETH");
	const [outputCurrency, setOutputCurrency] = useState("USD");
	const [rate, setRate] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const fetchRate = useCallback(async () => {
		try {
			const assets = await getAssets();
			const ethAsset = assets.find((asset) => asset.symbol === "ETH");
			if (ethAsset) {
				setRate(ethAsset.price);
			}
		} catch (err) {
			console.error("Failed to fetch exchange rate:", err);
		}
	}, []);

	useEffect(() => {
		fetchRate();
		const interval = setInterval(fetchRate, 10000);
		return () => clearInterval(interval);
	}, [fetchRate]);

	useEffect(() => {
		if (rate && inputAmount) {
			const amount = parseFloat(inputAmount);
			if (!isNaN(amount)) {
				if (inputCurrency === "USD") {
					setOutputAmount((amount / rate).toFixed(8));
				} else {
					setOutputAmount((amount * rate).toFixed(2));
				}
			} else {
				setOutputAmount("");
			}
		}
	}, [inputAmount, rate, inputCurrency]);

	const handleInputChange = (e) => {
		setInputAmount(e.target.value);
	};

	const handlePresetClick = (amount) => {
		if (inputCurrency === "USD") {
			setInputAmount(amount.toString());
		}
	};

	const handleSwap = () => {
		// Toggle between ETH input and USD input
		if (inputCurrency === "ETH") {
			setInputCurrency("USD");
			setOutputCurrency("ETH");
			setInputAmount(outputAmount || "0");
		} else {
			setInputCurrency("ETH");
			setOutputCurrency("USD");
			setInputAmount(outputAmount || "0.0");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!doesSessionExist) {
			setError("Please log in to trade.");
			return;
		}

		setError("");
		setSuccess("");

		try {
			const ethAmount =
				inputCurrency === "ETH"
					? parseFloat(inputAmount)
					: parseFloat(outputAmount);
			const response = await tradeAsset(activeTab, ethAmount, "ETH");
			setSuccess(
				response.message ||
					`${activeTab === "buy" ? "Purchase" : "Sale"} successful!`,
			);
			setInputAmount("");
			setOutputAmount("");
		} catch (err) {
			setError(
				err.response?.data?.error ||
					"An error occurred during the trade.",
			);
			console.error(err);
		}
	};

	const presetAmounts =
		inputCurrency === "USD" ? [100, 500, 1000] : [25, 50, 100];

	return (
		<div className="bg-[#2a2a2a] text-white p-6 rounded-xl w-full max-w-sm mx-auto mt-10 shadow-2xl border border-gray-700">
			{/* Tab Headers */}
			<div className="flex mb-6 bg-[#1a1a1a] rounded-lg p-1">
				<button
					type="button"
					onClick={() => setActiveTab("buy")}
					className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
						activeTab === "buy"
							? "bg-blue-500 text-white shadow-lg"
							: "text-gray-400 hover:text-white hover:bg-gray-700"
					}`}
				>
					Buy ETH
				</button>
				<button
					type="button"
					onClick={() => {
						setInputCurrency("ETH");
						setOutputCurrency("USD");
						setInputAmount(outputAmount || "0.0");
						setActiveTab("sell");
					}}
					className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
						activeTab === "sell"
							? "bg-red-500 text-white shadow-lg"
							: "text-gray-400 hover:text-white hover:bg-gray-700"
					}`}
				>
					Sell ETH
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				{/* Top Row - Input with currency */}
				<div className="flex justify-between items-center mb-2 p-3 bg-[#1a1a1a] rounded-lg">
					<input
						type="text"
						value={inputAmount}
						onChange={handleInputChange}
						className="bg-transparent text-3xl font-normal focus:outline-none w-full text-left text-white"
						placeholder="0"
					/>
					<span className="text-2xl text-gray-400 ml-4">
						{inputCurrency}
					</span>
				</div>

				{/* Conversion Display with swap button */}
				<div className="flex items-center mb-4 px-1 space-x-1">
					<span className="text-lg text-gray-400">
						{inputCurrency === "USD" && activeTab == "buy"
							? `~ ${outputAmount || "0"} ${outputCurrency}`
							: `$${outputAmount || "0"}`}
					</span>
					{activeTab === "buy" ? (
						<button
							type="button"
							onClick={handleSwap}
							className="text-gray-400 hover:text-white transition-colors"
						>
							<MdSwapVert size={24} />
						</button>
					) : null}
				</div>

				{/* Preset Buttons */}
				{inputCurrency === "USD" ? (
					<div className="flex space-x-2 mb-6">
						{presetAmounts.map((amount) => (
							<button
								key={amount}
								type="button"
								onClick={() => handlePresetClick(amount)}
								className={`py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 ${
									inputCurrency === "USD"
										? "bg-gray-600 hover:bg-gray-500 text-white"
										: "bg-gray-700 hover:bg-gray-600 text-gray-300"
								}`}
								disabled={inputCurrency !== "USD"}
							>
								${amount}
							</button>
						))}
					</div>
				) : null}

				{/* Trade Button */}
				<button
					type="submit"
					className={`w-full font-bold py-3 rounded-lg text-lg transition-all duration-300 ${
						activeTab === "buy"
							? "bg-blue-500 hover:bg-blue-700 text-white"
							: "bg-red-500 hover:bg-red-700 text-white"
					}`}
					disabled={
						!inputAmount ||
						!outputAmount ||
						parseFloat(inputAmount) <= 0 ||
						!doesSessionExist
					}
				>
					{activeTab === "buy" ? "Buy ETH" : "Sell ETH"}
				</button>

				{error && (
					<p className="text-red-500 mt-4 text-center text-sm">
						{error}
					</p>
				)}
				{success && (
					<p className="text-green-500 mt-4 text-center text-sm">
						{success}
					</p>
				)}
			</form>
		</div>
	);
};

export default TradeWidget;
