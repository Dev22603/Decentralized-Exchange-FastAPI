from fastapi import APIRouter
from controllers.controller import  buy_asset, sell_assset, quote, get_assets
from models.requests import BuyAssetRequest

router = APIRouter()


@router.post("/buy_asset")
def handle_buy_asset(request: BuyAssetRequest):
    return buy_asset(quantity=request.quantity)

@router.post("/sell_asset")
def handle_sell_asset():
    return sell_assset()

@router.get("/quote")
def handle_quote():
    return quote()

@router.get("/get_assets")
def handle_get_assets():
    return get_assets()
