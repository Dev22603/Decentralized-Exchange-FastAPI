
from repository.repository import init_assets, assets, buy, sell,deposit,eth_amount

def startup():
    init_assets(1000, 100000000)

def buy_eth(quantity):
    data = buy(quantity)
    response = {
        "status": 201,
        "message": "Transaction Successful",
        "data": data,
    }
    return response

def sell_eth(quantity):
    data = sell(quantity)
    response = {
        "status": 201,
        "message": "Transaction Successful",
        "data": data,
    }
    return response

def deposit_usdt(quantity):
    data = deposit(quantity)
    response={
        "status": 201,
        "message": "Deposit Successful",
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

def get_eth_amount(amount):
    data = eth_amount(amount)
    response = {
        "status": 200,
        "message": "ETH Amount",
        "data": data,
    }
    return response