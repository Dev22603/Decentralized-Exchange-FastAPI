import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartySignInAndUp from "supertokens-auth-react/recipe/thirdparty";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import DashboardPage from "./pages/DashboardPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import * as reactRouterDom from "react-router-dom";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";

export default function App() {
	return (
		<SuperTokensWrapper>
			<BrowserRouter>
				<Routes>
					{getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
						ThirdPartyPreBuiltUI,
					])}

					<Route path="/auth" element={<ThirdPartySignInAndUp />} />
					<Route
						path="/"
						element={
							<SessionAuth>
								<DashboardPage />
							</SessionAuth>
						}
					/>
					<Route
						path="/account"
						element={
							<SessionAuth>
								<AccountPage />
							</SessionAuth>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</SuperTokensWrapper>
	);
}
