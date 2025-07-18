from config import Config
from db import db, client


def init_assets(eth_balance, usd_balance):
    collection = db[Config.COLLECTION_NAME]

    default_assets = {
        "exchange": "Ethereum Decentralized Exchange",
        "ETH": {"name": "Ethereum", "quantity": eth_balance},
        "USD": {"name": "US Dollar", "quantity": usd_balance},
    }

    if not collection.find_one({"exchange": "Ethereum Decentralized Exchange"}):
        collection.insert_one(default_assets)


def assets():
    collection = db[Config.COLLECTION_NAME]
    return collection.find_one({}, {"_id": 0})


def buy(quantity):
    collection = db[Config.COLLECTION_NAME]
    asset = assets()
    eth_quantity = asset["ETH"]["quantity"]
    usd_quantity = asset["USD"]["quantity"]
    C = eth_quantity * usd_quantity
    if eth_quantity <= quantity:
        return {
            "error": "You don't have enough ETH for this transaction",
        }
    new_usd_quantity = C / (eth_quantity - quantity)
    usd_amount = new_usd_quantity - usd_quantity
    with client.start_session() as session:
        with session.start_transaction():
            collection.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"ETH.quantity": -quantity}},
                session=session,
            )
            collection.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"USD.quantity": usd_amount}},
                session=session,
            )
    return {"amount": usd_amount}


def sell(quantity):
    collection = db[Config.COLLECTION_NAME]
    asset = assets()
    eth_quantity = asset["ETH"]["quantity"]
    usd_quantity = asset["USD"]["quantity"]
    C = eth_quantity * usd_quantity
    new_eth_quantity = eth_quantity + quantity
    new_usd_quantity = C / new_eth_quantity
    usd_amount = usd_quantity - new_usd_quantity
    with client.start_session() as session:
        with session.start_transaction():
            collection.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"ETH.quantity": quantity}},
                session=session,
            )
            collection.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"USD.quantity": -usd_amount}},
                session=session,
            )
    return {"amount": usd_amount}
