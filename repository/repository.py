from config import Config
from db import db

def init_assets(eth_balance, usd_balance):
    collection = db[Config.COLLECTION_NAME]

    default_assets = {
        "exchange":"Ethereum Decentralized Exchange",
        "ETH": {
            "name": "Ethereum",
            "quantity": eth_balance
        },
        "USD": {
            "name": "US Dollar",
            "quantity": usd_balance
        }
        
    }


    if not collection.find_one({"exchange": "Ethereum Decentralized Exchange"}):
        collection.insert_one(default_assets)


def get_assets():
    collection = db[Config.COLLECTION_NAME]
    print(collection.find())