import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import api from '../services/api';

export default function AccountPage() {
  const [balances, setBalances] = useState({ ETH: 0, USDC: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAccountData = async () => {
    setLoading(true);
    setError('');
    try {
      const [balancesRes, transactionsRes] = await Promise.all([
        api.get('/api/account/balances'),
        api.get('/api/account/transactions')
      ]);
      setBalances(balancesRes.data);
      setTransactions(transactionsRes.data || []);
    } catch (err) {
      setError('Failed to fetch account data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading account information..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-white">Account</h1>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Overview */}
          <div className="card">
            <h2 className="card-header">Account Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">Ξ</span>
                  </div>
                  <span className="text-gray-300">ETH Balance</span>
                </div>
                <span className="text-xl font-semibold text-white">{balances.ETH}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">$</span>
                  </div>
                  <span className="text-gray-300">USDC Balance</span>
                </div>
                <span className="text-xl font-semibold text-white">{balances.USDC}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="card-header">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full btn-primary"
              >
                Go to Trading
              </button>
              <button
                onClick={fetchAccountData}
                className="w-full btn-secondary"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8 card">
          <h2 className="card-header">Transaction History</h2>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400">No transactions yet</p>
              <p className="text-gray-500 text-sm">Your trading history will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">From</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">To</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'swap' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{tx.from}</td>
                      <td className="py-3 px-4 text-gray-300">{tx.to}</td>
                      <td className="py-3 px-4 text-white font-medium">{tx.amount}</td>
                      <td className="py-3 px-4 text-gray-400">{formatDate(tx.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 