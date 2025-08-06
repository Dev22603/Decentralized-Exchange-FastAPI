from fastapi import APIRouter
from controllers.controller import buy_eth, sell_eth, get_assets, deposit_usdt
from models.requests import BuyAssetRequest, SellAssetRequest, DepositUSDTRequest
from supertokens_python.recipe.session.framework.fastapi import verify_session
from supertokens_python.recipe.userroles import UserRoleClaim
from supertokens_python.recipe.session import SessionContainer
from fastapi import Depends

router = APIRouter()


@router.post("/buy_eth")
async def handle_buy_eth(request: BuyAssetRequest, session: SessionContainer = Depends(verify_session)):
    user_id = session.get_user_id()
    user = session.req_res_info
    
    return buy_eth(user_id=user_id, quantity=request.quantity)


@router.post("/sell_eth")
async def handle_sell_eth(request: SellAssetRequest, session: SessionContainer = Depends(verify_session)):
    return sell_eth(quantity=request.quantity)


@router.get("/get_assets")
async def handle_get_assets(session: SessionContainer = Depends(verify_session)):
    return get_assets()

@router.post("/account/deposit_usdt")
async def handle_deposit_usdt(request: DepositUSDTRequest, session: SessionContainer = Depends(verify_session())):
    return deposit_usdt(quantity=request.quantity)