from datetime import datetime
from typing import Dict, Any, Optional
from bson import ObjectId
from db import db, client
from models.user import User, Transaction

# Liquidity Pool Collection
liquidity_pool = db["Liquidity-Pool"]
users_collection = db["Users"]

def init_assets(eth_balance: float, usd_balance: float) -> None:
    collection = db["Liquidity-Pool"]
    default_assets = {
        "exchange": "Ethereum Decentralized Exchange",
        "ETH": {"name": "Ethereum", "quantity": eth_balance},
        "USDT": {"name": "United States Dollar Tether", "quantity": usd_balance},
    }

    if not collection.find_one({"exchange": "Ethereum Decentralized Exchange"}):
        collection.insert_one(default_assets)


def assets() -> Dict[str, Any]:
    """Get current liquidity pool status"""
    return liquidity_pool.find_one({}, {"_id": 0})

def quote(eth_quantity: float) -> Dict[str, Any]:
    """Get current liquidity pool status"""
    return liquidity_pool.find_one({}, {"_id": 0})


def buy(user_id: str, eth_quantity: float) -> Dict[str, Any]:
    """Buy ETH with USDT
    
    Args:
        user_id: ID of the user making the purchase
        quantity: Amount of ETH to buy
        
    Returns:
        Dict with transaction details or error message
    """
    # Get current pool status
    pool = assets()
    if not pool:
        return {"error": "Liquidity pool not initialized"}
        
    pool_eth = pool["ETH"]["quantity"]
    pool_usdt = pool["USD"]["quantity"]
    C = pool_eth * pool_usdt
    
    if pool_eth <= eth_quantity:
        return {"error": "You don't have enough ETH for this transaction"}
        
    new_usd_quantity = C / (pool_eth - eth_quantity)
    usd_amount = new_usd_quantity - pool_usdt
    
    with client.start_session() as session:
        with session.start_transaction():
            liquidity_pool.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"ETH.quantity": -eth_quantity}},
                session=session,
            )
            liquidity_pool.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"USD.quantity": usd_amount}},
                session=session,
            )
    return {"amount": usd_amount}


def sell(quantity):
    asset = assets()
    if not asset:
        return {"error": "Liquidity pool not initialized"}
        
    eth_quantity = asset["ETH"]["quantity"]
    usd_quantity = asset["USD"]["quantity"]
    C = eth_quantity * usd_quantity
    
    new_eth_quantity = eth_quantity + quantity
    new_usd_quantity = C / new_eth_quantity
    usd_amount = usd_quantity - new_usd_quantity
    
    with client.start_session() as session:
        with session.start_transaction():
            liquidity_pool.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"ETH.quantity": quantity}},
                session=session,
            )
            liquidity_pool.update_one(
                {"exchange": "Ethereum Decentralized Exchange"},
                {"$inc": {"USD.quantity": -usd_amount}},
                session=session,
            )
    return {"amount": usd_amount}


def deposit(quantity):
    # Implementation for deposit functionality
    # This is a placeholder implementation
    return {"status": "Deposit functionality not yet implemented"}


def withdraw(quantity):
    # Implementation for withdraw functionality
    # This is a placeholder implementation
    return {"status": "Withdraw functionality not yet implemented"}
