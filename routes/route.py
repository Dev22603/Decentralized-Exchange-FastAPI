from fastapi import APIRouter
from controllers.controller import  buy_asset, sell_assset, quote

router = APIRouter()


@router.get("/buy_asset")
def buy_asset():    
    return buy_asset()

@router.get("/sell_asset")
def sell_asset():
    return sell_assset()

@router.get("/quote")
def quote():
    return quote()
