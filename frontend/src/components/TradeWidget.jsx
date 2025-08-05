import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ASSETS = [
  { label: 'ETH', value: 'ETH' },
  { label: 'USDC', value: 'USDC' },
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

  return (
    <div className="box trade-widget">
      <h3>Trade</h3>
      {loading ? (
        <div>Loading rate...</div>
      ) : (
        <div className="swap-rate">
          {rate ? `1 ${fromAsset} = ${rate} ${toAsset}` : 'Select assets to see rate'}
        </div>
      )}
      <form onSubmit={handleSwap}>
        <div className="swap-row">
          <span className="swap-label">You Pay</span>
          <select
            value={fromAsset}
            onChange={e => setFromAsset(e.target.value)}
            className="swap-input"
          >
            {ASSETS.filter(a => a.value !== toAsset).map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.000001"
            className="swap-input"
            placeholder="Amount"
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            required
          />
        </div>
        <div className="swap-row">
          <span className="swap-label">You Receive</span>
          <select
            value={toAsset}
            onChange={e => setToAsset(e.target.value)}
            className="swap-input"
          >
            {ASSETS.filter(a => a.value !== fromAsset).map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
          <input
            type="number"
            className="swap-input"
            value={toAmount}
            readOnly
            placeholder="Estimated"
          />
        </div>
        <button type="button" style={{ margin: '0.5rem 0' }} onClick={handleSwapAssets}>
          Swap Assets
        </button>
        <button type="submit" disabled={swapLoading}>
          {swapLoading ? 'Swapping...' : 'Swap'}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
} 