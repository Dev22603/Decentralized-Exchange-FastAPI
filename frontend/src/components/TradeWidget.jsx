import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const TradeWidget = () => {
  const [tradeType, setTradeType] = useState('buy'); // 'buy' or 'sell'
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [rate, setRate] = useState(null);
  const [fee, setFee] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { doesSessionExist } = useSessionContext();

  const asset1 = tradeType === 'buy' ? 'USDT' : 'ETH';
  const asset2 = tradeType === 'buy' ? 'ETH' : 'USDT';

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_assets');
        const { ETH, USDT } = response.data;
        setRate(ETH.quantity / USDT.quantity);
      } catch (err) {
        setError('Failed to fetch exchange rate.');
        console.error(err);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 10000); // Refresh rate every 10 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rate && amount1) {
      const value1 = parseFloat(amount1);
      let value2 = 0;
      if (tradeType === 'buy') {
        value2 = value1 / rate; // USDT to ETH
      } else {
        value2 = value1 * rate; // ETH to USDT
      }
      const calculatedFee = value2 * 0.003; // 0.3% fee
      setFee(calculatedFee);
      setAmount2((value2 - calculatedFee).toFixed(6));
    } else {
      setAmount2('');
      setFee(0);
    }
  }, [amount1, rate, tradeType]);

  const handleAmount1Change = (e) => {
    setAmount1(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doesSessionExist) {
      setError('Please log in to trade.');
      return;
    }

    setError('');
    setSuccess('');

    const endpoint = tradeType === 'buy' ? 'http://localhost:8000/buy_eth' : 'http://localhost:8000/sell_eth';
    const payload = { eth_quantity: parseFloat(tradeType === 'buy' ? amount2 : amount1) };

    try {
      const response = await axios.post(endpoint, payload, { withCredentials: true });
      setSuccess(response.data.message || 'Trade successful!');
      setAmount1('');
      setAmount2('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during the trade.');
      console.error(err);
    }
  };

  const getAssetColor = (asset) => {
    return asset === 'ETH' ? 'text-purple-400' : 'text-green-400';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-2 text-lg font-semibold transition-colors duration-300 ${tradeType === 'buy' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}>
          Buy ETH
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-2 text-lg font-semibold transition-colors duration-300 ${tradeType === 'sell' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}>
          Sell ETH
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input for the first asset */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            You Spend
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount1}
              onChange={handleAmount1Change}
              placeholder="0.0"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 font-bold ${getAssetColor(asset1)}`}>
              {asset1}
            </span>
          </div>
        </div>

        {/* Input for the second asset */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            You Receive
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount2}
              readOnly
              placeholder="0.0"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
            />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 font-bold ${getAssetColor(asset2)}`}>
              {asset2}
            </span>
          </div>
        </div>

        {/* Rate and Fee Information */}
        <div className="text-sm text-gray-400 mb-4">
          {rate ? (
            <p>Rate: 1 ETH ≈ {rate.toFixed(2)} USDT</p>
          ) : (
            <p>Loading rate...</p>
          )}
          <p>Fee (0.3%): {fee.toFixed(6)} {asset2}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
          disabled={!amount1 || !doesSessionExist}
        >
          {tradeType === 'buy' ? 'Buy ETH' : 'Sell ETH'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
    </div>
  );
};

export default TradeWidget;