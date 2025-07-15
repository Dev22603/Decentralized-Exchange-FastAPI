from config import Config
from db import db

def init_assets(eth_balance, usd_balance):
    collection = db[Config.COLLECTION_NAME]

    default_assets = {
    
            "ETH": {
                "name": "Ethereum",
                "quantity": eth_balance
            },
            "USD": {
                "name": "US Dollar",
                "quantity": usd_balance
            }
        
    }

    # Only insert if not exists
    print(collection)
    if not collection.find():
        collection.insert_one(default_assets)


def get_assets():
    collection = db[Config.COLLECTION_NAME]
    print(collection.find())