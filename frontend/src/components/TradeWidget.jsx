import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ASSETS = [
  { label: 'ETH', value: 'ETH', icon: 'Ξ', color: 'bg-blue-500' },
  { label: 'USDC', value: 'USDC', icon: '$', color: 'bg-green-500' },
];

export default function TradeWidget({ balances, onBalanceUpdate }) {
  const [fromAsset, setFromAsset] = useState('ETH');
  const [toAsset, setToAsset] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRate();
    // eslint-disable-next-line
  }, [fromAsset, toAsset]);

  const fetchRate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/trade/rate', {
        params: { from: fromAsset, to: toAsset },
      });
      setRate(res.data.rate);
    } catch (err) {
      setError('Failed to fetch rate');
    } finally {
      setLoading(false);
    }
  };

  // Calculate toAmount with 0.3% fee
  useEffect(() => {
    if (!fromAmount || !rate) {
      setToAmount('');
      return;
    }
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) {
      setToAmount('');
      return;
    }
    // Fee: 0.3%
    const fee = amount * 0.003;
    const amountAfterFee = amount - fee;
    setToAmount((amountAfterFee * rate).toFixed(6));
  }, [fromAmount, rate]);

  const handleSwapAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount('');
    setToAmount('');
    setError('');
    setSuccess('');
  };

  const handleSwap = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (Number(fromAmount) > Number(balances[fromAsset])) {
      setError(`Insufficient ${fromAsset} balance`);
      return;
    }
    setSwapLoading(true);
    try {
      const res = await api.post('/api/trade/swap', {
        from: fromAsset,
        to: toAsset,
        amount: Number(fromAmount),
      });
      onBalanceUpdate(res.data);
      setSuccess('Swap successful!');
      setFromAmount('');
      setToAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Swap failed');
    } finally {
      setSwapLoading(false);
    }
  };

  const getAssetIcon = (assetValue) => {
    const asset = ASSETS.find(a => a.value === assetValue);
    return asset ? asset.icon : assetValue;
  };

  const getAssetColor = (assetValue) => {
    const asset = ASSETS.find(a => a.value === assetValue);
    return asset ? asset.color : 'bg-gray-500';
  };

  return (
    <div className="card">
      <h3 className="card-header">Trade</h3>
      
      {/* Exchange Rate */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        {loading ? (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Loading rate...</span>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Exchange Rate</p>
            <p className="text-blue-400 font-semibold">
              {rate ? `1 ${fromAsset} = ${rate} ${toAsset}` : 'Select assets to see rate'}
            </p>
            <p className="text-gray-500 text-xs mt-1">0.3% fee included</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSwap} className="space-y-6">
        {/* From Asset */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            You Pay
          </label>
          <div className="flex space-x-3">
            <div className="flex-1">
              <select
                value={fromAsset}
                onChange={e => setFromAsset(e.target.value)}
                className="input-field"
              >
                {ASSETS.filter(a => a.value !== toAsset).map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="number"
                min="0"
                step="0.000001"
                placeholder="Amount"
                value={fromAmount}
                onChange={e => setFromAmount(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Balance: {balances[fromAsset]} {fromAsset}</span>
            <button
              type="button"
              onClick={() => setFromAmount(balances[fromAsset])}
              className="text-blue-400 hover:text-blue-300"
            >
              Max
            </button>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwapAssets}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To Asset */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            You Receive
          </label>
          <div className="flex space-x-3">
            <div className="flex-1">
              <select
                value={toAsset}
                onChange={e => setToAsset(e.target.value)}
                className="input-field"
              >
                {ASSETS.filter(a => a.value !== fromAsset).map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="Estimated"
                className="input-field bg-gray-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button 
          type="submit" 
          disabled={swapLoading || !fromAmount || !toAmount}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {swapLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Swapping...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Swap {fromAsset} for {toAsset}</span>
            </div>
          )}
        </button>
      </form>

      {/* Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded-lg text-green-200">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{success}</span>
          </div>
        </div>
      )}
    </div>
  );
} 