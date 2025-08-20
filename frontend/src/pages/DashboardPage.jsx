import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import AccountInfo from "../components/AccountInfo.jsx";
import TradeWidget from "../components/TradeWidget.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { apiClient } from "../utils/api.js";

export default function DashboardPage() {
	const [balances, setBalances] = useState({ ETH: 0, USDC: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchBalances = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await apiClient.get("/api/account/balances");
			setBalances(res.data);
		} catch (err) {
			setError("Failed to fetch balances");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBalances();
	}, []);

	const handleBalanceUpdate = (newBalances) => {
		setBalances(newBalances);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-900">
				<Navbar />
				<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
					<LoadingSpinner size="lg" text="Loading balances..." />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900">
			<Navbar />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{error && (
					<div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>{error}</span>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<AccountInfo
						balances={balances}
						onBalanceUpdate={handleBalanceUpdate}
					/>
					<TradeWidget
						balances={balances}
						onBalanceUpdate={handleBalanceUpdate}
					/>
				</div>
			</div>
		</div>
	);
}
