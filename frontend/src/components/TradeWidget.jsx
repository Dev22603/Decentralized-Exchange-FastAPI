import React, { useState, useEffect, useCallback } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { getAssets, tradeAsset } from '../utils/api';
import { MdSwapVert } from "react-icons/md";

const TradeWidget = () => {
  const { doesSessionExist } = useSessionContext();
  const [inputAmount, setInputAmount] = useState('0.0');
  const [outputAmount, setOutputAmount] = useState('');
  const [inputCurrency, setInputCurrency] = useState('ETH');
  const [outputCurrency, setOutputCurrency] = useState('USD');
  const [rate, setRate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchRate = useCallback(async () => {
    try {
      const assets = await getAssets();
      const ethAsset = assets.find(asset => asset.symbol === 'ETH');
      if (ethAsset) {
        setRate(ethAsset.price);
      }
    } catch (err) {
      console.error('Failed to fetch exchange rate:', err);
    }
  }, []);

  useEffect(() => {
    fetchRate();
    const interval = setInterval(fetchRate, 10000);
    return () => clearInterval(interval);
  }, [fetchRate]);

  useEffect(() => {
    if (rate && inputAmount) {
      const amount = parseFloat(inputAmount);
      if (!isNaN(amount)) {
        if (inputCurrency === 'USD') {
          setOutputAmount((amount / rate).toFixed(8));
        } else {
          setOutputAmount((amount * rate).toFixed(2));
        }
      } else {
        setOutputAmount('');
      }
    }
  }, [inputAmount, rate, inputCurrency]);

  const handleInputChange = (e) => {
    setInputAmount(e.target.value);
  };

  const handlePresetClick = (amount) => {
    if (inputCurrency === 'USD') {
      setInputAmount(amount.toString());
    }
  };

  const handleSwap = () => {
    // Toggle between ETH input and USD input
    if (inputCurrency === 'ETH') {
      setInputCurrency('USD');
      setOutputCurrency('ETH');
      setInputAmount(outputAmount || '15');
    } else {
      setInputCurrency('ETH');
      setOutputCurrency('USD');
      setInputAmount(outputAmount || '0.0');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doesSessionExist) {
      setError('Please log in to trade.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const ethAmount = inputCurrency === 'ETH' ? parseFloat(inputAmount) : parseFloat(outputAmount);
      const response = await tradeAsset('buy', ethAmount, 'ETH');
      setSuccess(response.message || 'Trade successful!');
      setInputAmount('');
      setOutputAmount('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during the trade.');
      console.error(err);
    }
  };

  const presetAmounts = inputCurrency === 'USD' ? [100, 500, 1000] : [25, 50, 100];

  return (
    <div className="bg-[#2a2a2a] text-white p-4 rounded-xl w-full max-w-sm mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        {/* Top Row - Input with currency */}
        <div className="flex justify-between items-center mb-2 p-3 bg-[#1a1a1a] rounded-lg">
          <input 
            type="text" 
            value={inputAmount}
            onChange={handleInputChange}
            className="bg-transparent text-3xl font-normal focus:outline-none w-full text-left text-white"
            placeholder="0"
          />
          <span className="text-2xl text-gray-400 ml-4">{inputCurrency}</span>
        </div>

        {/* Conversion Display with swap button */}
        <div className="flex items-center mb-4 px-1 space-x-1">
          <span className="text-lg text-gray-400">
            {inputCurrency === 'USD' ? `~ ${outputAmount || '0'} ${outputCurrency}` : `$${outputAmount || '0'}`}
          </span>
          <button
            type="button"
            onClick={handleSwap}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MdSwapVert size={24} />
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="flex space-x-2 mb-6">
          {presetAmounts.map(amount => (
            <button 
              key={amount} 
              type="button"
              onClick={() => handlePresetClick(amount)}
              className={`py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 ${
                inputCurrency === 'USD' 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              disabled={inputCurrency !== 'USD'}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Buy Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-colors duration-300 "
          disabled={!inputAmount || !outputAmount || parseFloat(inputAmount) <= 0 || !doesSessionExist}
        >
          Buy ETH
        </button>

        {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default TradeWidget;