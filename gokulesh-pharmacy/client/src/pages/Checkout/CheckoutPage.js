import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder, createPhonePeOrder } from '../../utils/api';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [onlinePayLoading, setOnlinePayLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [form, setForm] = useState({
    name: user?.name || '', mobile: user?.mobile || '',
    street: user?.address?.street || '', city: user?.address?.city || '',
    state: user?.address?.state || '', pincode: user?.address?.pincode || '',
    notes: ''
  });

  const shipping = total >= 499 ? 0 : 60;
  const grandTotal = total + shipping;
  const ch = (k) => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const validateAddress = () => {
    if (!form.mobile) {
      toast.error('📱 Mobile number is required');
      return false;
    }
    if (!form.street || !form.city || !form.state || !form.pincode) {
      toast.error('📍 Complete address required');
      return false;
    }
    return true;
  };

  const handleCodSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;
    setLoading(true);
    try {
      await createOrder({
        items: items.map(i => ({ product: i._id, quantity: i.qty })),
        shippingAddress: {
          name: form.name,
          mobile: form.mobile,
          street: form.street,
          city: form.city,
          state: form.state,
          pincode: form.pincode
        },
        notes: form.notes,
        paymentMethod: 'COD'
      });
      clearCart();
      toast.success('🎉 Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;

    if (!items.length) {
      toast.error('Your cart is empty');
      return;
    }

    setOnlinePayLoading(true);
    try {
      const orderRes = await createPhonePeOrder({ amount: grandTotal });
      const { checkoutUrl, merchantOrderId } = orderRes.data;

      const payload = {
        merchantOrderId,
        items: items.map(i => ({ product: i._id, quantity: i.qty })),
        shippingAddress: {
          name: form.name,
          mobile: form.mobile,
          street: form.street,
          city: form.city,
          state: form.state,
          pincode: form.pincode
        },
        notes: form.notes
      };

      localStorage.setItem('gp_phonepe_pending', JSON.stringify(payload));

      window.location.href = checkoutUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to start online payment, please try again or choose COD.');
    } finally {
      setOnlinePayLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <form className="checkout-layout" onSubmit={paymentMethod === 'COD' ? handleCodSubmit : handleOnlinePayment}>
          <div className="checkout-form-card">
            <h3>🚚 Delivery Information</h3>
            <div className="form-grid-2">
              <div className="form-group"><label>Full Name</label>
                <input value={form.name} onChange={ch('name')} placeholder="Recipient's name" required /></div>
              <div className="form-group"><label>Mobile Number *</label>
                <input type="tel" value={form.mobile} onChange={ch('mobile')} placeholder="10-digit mobile" required /></div>
            </div>
            <div className="form-group" style={{ marginTop: 18 }}><label>Street Address *</label>
              <input value={form.street} onChange={ch('street')} placeholder="House no, Street, Area, Landmark" required /></div>
            <div className="form-grid-3" style={{ marginTop: 0 }}>
              <div className="form-group"><label>City *</label><input value={form.city} onChange={ch('city')} required /></div>
              <div className="form-group"><label>State *</label><input value={form.state} onChange={ch('state')} required /></div>
              <div className="form-group"><label>Pincode *</label><input value={form.pincode} onChange={ch('pincode')} required /></div>
            </div>
            <div className="form-group"><label>Special Instructions (Optional)</label>
              <textarea value={form.notes} onChange={ch('notes')} rows={2} placeholder="Any notes for delivery..." /></div>
            <div className="payment-methods">
              <h4>Payment Method</h4>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay at your doorstep</small>
                  </span>
                </label>
                <label className={`payment-option ${paymentMethod === 'ONLINE' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    value="ONLINE"
                    checked={paymentMethod === 'ONLINE'}
                    onChange={() => setPaymentMethod('ONLINE')}
                  />
                  <span>
                    <strong>Online Payment</strong>
                    <small>UPI / Cards / Netbanking</small>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout-summary-card">
            <h3>📦 Order Summary</h3>
            {items.map(item => (
              <div key={item._id} className="co-item">
                <span style={{ flex: 1 }}>{item.name} <span style={{ color: 'var(--text-muted)' }}>×{item.qty}</span></span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ height: 8 }} />
            <div className="co-item"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="co-item">
              <span>Delivery</span>
              <span style={shipping === 0 ? { color: 'var(--success)', fontWeight: 700 } : {}}>
                {shipping === 0 ? '🎉 FREE' : `₹${shipping}`}
              </span>
            </div>
            {shipping > 0 && <p style={{ fontSize: 12, color: '#92400e', background: '#fef9c3', padding: '8px 12px', borderRadius: 8, margin: '6px 0' }}>Add ₹{499 - total} more for FREE delivery!</p>}
            <div className="co-item co-total"><span>Total</span><span>₹{grandTotal}</span></div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading || onlinePayLoading}
            >
              {paymentMethod === 'COD'
                ? (loading ? '⏳ Placing COD Order...' : `🛒 Place COD Order · ₹${grandTotal}`)
                : (onlinePayLoading ? '⏳ Opening Payment...' : `💳 Pay Online · ₹${grandTotal}`)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
