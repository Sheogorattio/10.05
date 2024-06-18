import { RootState, AppDispatch } from '../state/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResultAsync } from '../state/CurrencySlice';

const CurrencyExchange = () => {
  const result = useSelector((state: RootState) => state.exchange.result);
  const dispatch: AppDispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [selectedCur, setSelectedCur] = useState("USD");

  useEffect(() => {
    if (amount > 0 && selectedCur) {
      dispatch(getResultAsync({ amount, currency: selectedCur }));
    }
  }, [amount, selectedCur, dispatch]);

  return (
    <div>
      <h1>Currency Exchange</h1>
      <select onChange={(e) => setSelectedCur(e.currentTarget.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>
      <div className='d-flex' style={{ justifyContent: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.currentTarget.value))}
          />
          <p style={{ display: 'inline-block' }}>UAH</p>
        </div>
        <p style={{ display: 'inline-block' }}>-</p>
        <div style={{ display: 'inline-block' }}>
          <input type="number" value={result} disabled />
          <p style={{ display: 'inline-block' }}>{selectedCur}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
