from fastapi import FastAPI
from routes import route
from controllers.controller import startup

app = FastAPI()
app.include_router(route, prefix="/api", tags=["api"])



@app.on_startup()
def startup_event():
    return startup()
@app.get("/")
def root():
    return {"message": "Welcome to De Bachani's Decentralized Exchange"}