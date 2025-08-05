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
    <div className="box account-info">
      <h3>Account Balances</h3>
      <div className="balance-row"><span>ETH:</span> <span>{balances.ETH}</span></div>
      <div className="balance-row"><span>USDC:</span> <span>{balances.USDC}</span></div>
      <form onSubmit={handleDeposit} style={{ marginTop: '1rem' }}>
        <div className="form-group">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Deposit USDC amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Depositing...' : 'Deposit USDC'}</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
} 