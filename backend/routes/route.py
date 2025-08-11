from fastapi import APIRouter
from controllers.controller import buy_eth, sell_eth, get_assets, deposit_usdt,get_eth_amount
from models.requests import TradeAssetRequest, DepositUSDTRequest
from supertokens_python.recipe.session.framework.fastapi import verify_session
from supertokens_python.recipe.userroles import UserRoleClaim
from supertokens_python.recipe.session import SessionContainer
from fastapi import Depends

router = APIRouter()


@router.post("/buy_eth")
async def handle_buy_eth(request: TradeAssetRequest, session: SessionContainer = Depends(verify_session)):
    user_id = session.get_user_id()
    return buy_eth(user_id=user_id, amount=request.amount, currency=request.currency)


@router.post("/sell_eth")
async def handle_sell_eth(request: TradeAssetRequest, session: SessionContainer = Depends(verify_session)):
    user_id = session.get_user_id()
    return sell_eth(user_id=user_id, amount=request.amount, currency=request.currency)


@router.get("/get_assets")
async def handle_get_assets(session: SessionContainer = Depends(verify_session)):
    return get_assets()

@router.post("/account/deposit_usdt")
async def handle_deposit_usdt(request: DepositUSDTRequest, session: SessionContainer = Depends(verify_session())):
    return deposit_usdt(quantity=request.amount)

@router.get("/get_eth_amount")
async def handle_get_eth_amount(amount: float, session: SessionContainer = Depends(verify_session(session_required=True))):
    return get_eth_amount(amount)#temp changes till session verification is done
