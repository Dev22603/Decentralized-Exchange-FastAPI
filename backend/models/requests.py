from pydantic import BaseModel

class TradeAssetRequest(BaseModel):
    amount: float
    currency: str

class DepositUSDTRequest(BaseModel):
    amount: float