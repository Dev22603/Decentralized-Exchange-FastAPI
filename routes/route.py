from fastapi import APIRouter
from controllers.controller import  buy_asset, sell_assset, quote, get_assets

router = APIRouter()


@router.post("/buy_asset")
def buy_asset():    
    return buy_asset()

@router.post("/sell_asset")
def sell_asset():
    return sell_assset()

@router.get("/quote")
def quote():
    return quote()

@router.get("/get_assets")
def get_assets():
    return