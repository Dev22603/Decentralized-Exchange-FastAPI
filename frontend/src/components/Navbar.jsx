import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";

export default function Navbar() {
	const location = useLocation();

	const handleLogout = async () => {
		await signOut();
		window.location.href = "/auth";
	};

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and Brand */}
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<svg
									className="w-5 h-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
									/>
								</svg>
							</div>
							<span className="text-xl font-bold text-white">
								DeFi Exchange
							</span>
						</div>
					</div>

					{/* Navigation Links */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
								isActive("/")
									? "bg-blue-600 text-white"
									: "text-gray-300 hover:text-white hover:bg-gray-700"
							}`}
						>
							<div className="flex items-center space-x-2">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
								<span>Trading</span>
							</div>
						</Link>

						<Link
							to="/account"
							className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
								isActive("/account")
									? "bg-blue-600 text-white"
									: "text-gray-300 hover:text-white hover:bg-gray-700"
							}`}
						>
							<div className="flex items-center space-x-2">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
								<span>Account</span>
							</div>
						</Link>
					</div>

					{/* User Actions */}
					<div className="flex items-center space-x-4">
						<button
							onClick={handleLogout}
							className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
						>
							<div className="flex items-center space-x-2">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								<span>Logout</span>
							</div>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="md:hidden">
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<Link
						to="/"
						className={`block px-3 py-2 rounded-md text-base font-medium ${
							isActive("/")
								? "bg-blue-600 text-white"
								: "text-gray-300 hover:text-white hover:bg-gray-700"
						}`}
					>
						Trading
					</Link>
					<Link
						to="/account"
						className={`block px-3 py-2 rounded-md text-base font-medium ${
							isActive("/account")
								? "bg-blue-600 text-white"
								: "text-gray-300 hover:text-white hover:bg-gray-700"
						}`}
					>
						Account
					</Link>
				</div>
			</div>
		</nav>
	);
}
