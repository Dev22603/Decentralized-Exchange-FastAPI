from fastapi import FastAPI
from supertokens_python.recipe.session.interfaces import APIInterface
from routes.route import router
from controllers.controller import startup

from supertokens_python import get_all_cors_headers, init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import session, multitenancy, thirdparty

from supertokens_python.framework.fastapi import get_middleware
from fastapi.middleware.cors import CORSMiddleware
from supertokens_python.recipe.thirdparty import InputOverrideConfig, ProviderInput, ProviderConfig, ProviderClientConfig, SignInAndUpFeature
from config import Config 
from supertokens_python.recipe.thirdparty.interfaces import (
    SignInUpPostOkResult,
    SignInUpPostNoEmailGivenByProviderResponse,
    APIInterface,
)
from typing import Dict, Any
from supertokens_python.exceptions import BadInputError

app = FastAPI()



ALLOWED_DOMAIN = "@zymr.com"


class FieldErrorResponse:
    def __init__(self, form_fields):
        self.form_fields = form_fields            # list[dict]

    def to_json(self):
        return {
            "status": "FIELD_ERROR",
            "formFields": self.form_fields,
        }
def get_thirdparty_override():
    def override_apis(oi: APIInterface):
        original = oi.sign_in_up_post

        async def sign_in_up_post(**kwargs):
            # Call original with all parameters dynamically
            result = await original(**kwargs)
            print("result::", result.user.to_json())

            # Handle no email case
            if isinstance(result, SignInUpPostNoEmailGivenByProviderResponse):
                return result

            # Enforce @zymr.com domain rule
            if isinstance(result, SignInUpPostOkResult):
                email = (result.user.login_methods[0].email or "").lower()
                if not email.endswith(ALLOWED_DOMAIN):
                    raise BadInputError("Only @zymr.com emails are allowed")
            print("finalresult::", result)

            return result

        oi.sign_in_up_post = sign_in_up_post
        return oi

    return InputOverrideConfig(apis=override_apis)

init(
    app_info=InputAppInfo(
        app_name="DeFi",
        api_domain="http://localhost:8000",
        website_domain="http://localhost:5173",
        api_base_path="/auth",
        website_base_path="/auth"
    ),
    supertokens_config=SupertokensConfig(
        connection_uri="http://localhost:3567"
    ),
    framework='fastapi',
    recipe_list=[
        session.init(
                    expose_access_token_to_frontend_in_cookie_based_auth=True
                ),
        thirdparty.init(
            sign_in_and_up_feature=thirdparty.SignInAndUpFeature(
                providers=[
                    ProviderInput(
                        config=ProviderConfig(
                            third_party_id='google',
                            clients=[
                                ProviderClientConfig(
                                    client_id=Config.GOOGLE_CLIENT_ID,
                                    client_secret=Config.GOOGLE_CLIENT_SECRET,
                                    scope=["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile","openid"]
                                )
                            ]
                        )
                    )
                    
                ],
            ),
                        override=get_thirdparty_override(),  # add this

        ),
        multitenancy.init(),
    ],
    mode='asgi'
)
app.add_middleware(get_middleware())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),

)


app.include_router(router, prefix="/api", tags=["api"])


@app.on_event("startup")
def startup_event():
    return startup()


@app.get("/")
def root():
    return {"message": "Welcome to Dev Bachani's Decentralized Exchange"}