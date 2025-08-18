import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SuperTokens from "supertokens-auth-react";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
	appInfo: {
		appName: "AMM Exchange",
		apiDomain: "http://127.0.0.1:8000", // Backend API
		websiteDomain: window.location.origin,
		apiBasePath: "/auth",
		websiteBasePath: "/auth",
	},
	recipeList: [
		ThirdParty.init({
			signInAndUpFeature: {
				providers: [Google.init()],
			},
			override: {
				apis: (originalImplementation) => {
					return {
						...originalImplementation,
						signInUpPOST: async function (input) {
							try {
								// Call the original implementation first
								let response = await originalImplementation.signInUpPOST(input);
								console.log(response);
								
								// Check if the response is successful and has user data
								if (response.status === "OK") {
									const email = response.user.emails[0];

									// Check if email ends with @zymr.com
									if (!email.endsWith("@zymr.com")) {
										// Return a custom error response
										return {
											status: "GENERAL_ERROR",
											message: "Only @zymr.com emails are allowed to sign in."
										};
									}
								}

								return response;
							} catch (error) {
								// Handle any errors from backend
								console.log("---");
								
								return {
									status: "GENERAL_ERROR",
									message: "Authentication failed. Please try again."
								};
							}
						}
					}
				}
			}
		}),
		Session.init(),
		EmailPassword.init()
	],
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
