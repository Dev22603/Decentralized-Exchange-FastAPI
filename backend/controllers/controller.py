from repository.repository import init_assets, assets, buy, sell

def startup():
    init_assets(1000, 100000000)

def buy_asset(quantity):
    data = buy(quantity)
    response = {
        "status": 201,
        "message": "Transaction Successful",
        "data": data,
    }
    return response

def sell_asset(quantity):
    data = sell(quantity)
    response = {
        "status": 201,
        "message": "Transaction Successful",
        "data": data,
    }
    return response

def get_assets():
    data = assets()
    response = {
        "status": 200,
        "message": "Assets in the liquidity pool of the Ethereum Decentralized Exchange",
        "data": data,
    }
    return response