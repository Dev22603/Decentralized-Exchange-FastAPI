from fastapi import FastAPI
from routes.route import router
from controllers.controller import startup

from supertokens_python import get_all_cors_headers, init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import session, multitenancy, thirdparty

from supertokens_python.framework.fastapi import get_middleware
from fastapi.middleware.cors import CORSMiddleware
from supertokens_python.recipe.thirdparty import ProviderInput, ProviderConfig, ProviderClientConfig, SignInAndUpFeature
from config import Config 


app = FastAPI()

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
                ),#temp changes till session verification is done
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
                    
                ]
            )
        ),
        multitenancy.init(),
    ],
    mode='asgi'
)
app.add_middleware(get_middleware())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
