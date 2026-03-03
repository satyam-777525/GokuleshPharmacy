import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { confirmPhonePePayment } from '../../utils/api';
import './CheckoutPage.css';

export default function PhonePeResultPage() {
  const [status, setStatus] = useState('processing'); // processing | success | error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem('gp_phonepe_pending');
    if (!stored) {
      setStatus('error');
      setMessage('No pending payment found. If money was debited, please contact support with your transaction details.');
      return;
    }

    const payload = JSON.parse(stored);
    confirmPhonePePayment(payload)
      .then(() => {
        clearCart();
        localStorage.removeItem('gp_phonepe_pending');
        setStatus('success');
        setMessage('Payment successful and your order has been placed!');
        setTimeout(() => navigate('/orders'), 1800);
      })
      .catch((err) => {
        setStatus('error');
        setMessage(
          err.response?.data?.message ||
          'Could not confirm payment. If amount was debited, please contact support with your PhonePe transaction ID.'
        );
      });
  }, [clearCart, navigate]);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Confirming Payment</h1>
        <div className="checkout-summary-card">
          {status === 'processing' && (
            <p>Checking payment status with PhonePe. Please do not close this page...</p>
          )}
          {status === 'success' && (
            <p>{message}</p>
          )}
          {status === 'error' && (
            <>
              <p style={{ color: 'var(--danger)', marginBottom: 16 }}>{message}</p>
              <button
                className="btn btn-primary btn-full"
                type="button"
                onClick={() => navigate('/orders')}
              >
                Go to My Orders
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

