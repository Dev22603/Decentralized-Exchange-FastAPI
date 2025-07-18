from pydantic import BaseModel

class BuyAssetRequest(BaseModel):
    quantity: float