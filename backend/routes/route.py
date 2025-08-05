from fastapi import APIRouter
from controllers.controller import buy_asset, sell_asset, get_assets
from models.requests import BuyAssetRequest, SellAssetRequest

router = APIRouter()


@router.post("/buy_asset")
def handle_buy_asset(request: BuyAssetRequest):
    return buy_asset(quantity=request.quantity)


@router.post("/sell_asset")
def handle_sell_asset(request: SellAssetRequest):
    return sell_asset(quantity=request.quantity)


@router.get("/get_assets")
def handle_get_assets():
    return get_assets()
