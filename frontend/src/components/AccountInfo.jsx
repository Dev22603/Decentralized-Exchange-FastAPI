import React, { useState } from 'react';
import api from '../services/api';

export default function AccountInfo({ balances, onBalanceUpdate }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await api.post('/api/account/deposit', { amount: Number(amount) });
      onBalanceUpdate(res.data);
      setSuccess('Deposit successful!');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="card-header">Account Balances</h3>
      
      {/* Balance Display */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">Ξ</span>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Ethereum</p>
              <p className="text-white font-semibold">{balances.ETH}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-white font-medium">{balances.ETH} ETH</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">$</span>
            </div>
            <div>
              <p className="text-gray-300 text-sm">USD Coin</p>
              <p className="text-white font-semibold">{balances.USDC}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-white font-medium">{balances.USDC} USDC</p>
          </div>
        </div>
      </div>

      {/* Deposit Form */}
      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Deposit USDC</h4>
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-300 mb-2">
              Amount (USDC)
            </label>
          <input
              id="deposit-amount"
            type="number"
            min="0"
            step="0.01"
              placeholder="Enter amount to deposit"
            value={amount}
            onChange={e => setAmount(e.target.value)}
              className="input-field"
            required
          />
        </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Depositing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Deposit USDC</span>
              </div>
            )}
          </button>
      </form>
        
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
    </div>
  );
} 