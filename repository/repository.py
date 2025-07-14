from config import Config
from db import db

def init_assets(eth_balance, usd_balance):
    collection = Config.MONGO_DB_NAME
    default_assets=[
        {
            "symbol":"ETH",
            "name":"Ethereum",
            "quantity":eth_balance,
        },
        {
            "symbol":"USD",
            "name":"US Dollar",
            "quantity":usd_balance,
        }
    ]
    for asset in default_assets:
        if not collection.find_one({"symbol": asset["symbol"]}):
            collection.insert_one(asset)
