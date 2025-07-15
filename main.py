from fastapi import FastAPI
from routes.route import router
from controllers.controller import startup

app = FastAPI()
app.include_router(router, prefix="/api", tags=["api"])



@app.on_event("startup")
def startup_event():
    return startup()
@app.get("/")
def root():
    return {"message": "Welcome to De Bachani's Decentralized Exchange"}

