from pydantic import BaseModel


class BuyAssetRequest(BaseModel):
    quantity: float


class SellAssetRequest(BaseModel):
    quantity: float
