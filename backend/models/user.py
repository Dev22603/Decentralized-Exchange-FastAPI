from datetime import datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class Transaction(BaseModel):
    type: Literal["deposit", "withdraw", "buy", "sell"]
    amount: float
    timestamp: datetime = Field(default_factory=datetime.now)
    token: str  # 'USDT' or 'ETH'
    price: Optional[float] = None  # Price per token for buy/sell operations

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    email: str
    usdt_balance: float = 0.0
    eth_balance: float = 0.0
    transactions_history: List[Transaction] = []
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "usdt_balance": 1000.0,
                "eth_balance": 1.5,
                "transactions_history": [
                    {
                        "type": "deposit",
                        "amount": 1000.0,
                        "timestamp": "2023-08-06T06:26:02.123456",
                        "token": "USDT"
                    }
                ]
            }
        }
