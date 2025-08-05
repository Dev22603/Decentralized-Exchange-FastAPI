import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import AccountInfo from '../components/AccountInfo.jsx';
import TradeWidget from '../components/TradeWidget.jsx';
import api from '../services/api';

export default function DashboardPage() {
  const [balances, setBalances] = useState({ ETH: 0, USDC: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBalances = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/account/balances');
      setBalances(res.data);
    } catch (err) {
      setError('Failed to fetch balances');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  const handleBalanceUpdate = (newBalances) => {
    setBalances(newBalances);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {error && <div className="error">{error}</div>}
        {loading ? (
          <div>Loading balances...</div>
        ) : (
          <>
            <AccountInfo balances={balances} onBalanceUpdate={handleBalanceUpdate} />
            <TradeWidget balances={balances} onBalanceUpdate={handleBalanceUpdate} />
          </>
        )}
      </div>
    </>
  );
} 