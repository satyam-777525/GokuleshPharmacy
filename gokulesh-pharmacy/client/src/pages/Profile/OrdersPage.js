import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../utils/api';
import './Profile.css';

const STATUS_BADGE = { pending: 'badge-yellow', confirmed: 'badge-blue', processing: 'badge-blue', shipped: 'badge-blue', delivered: 'badge-green', cancelled: 'badge-red' };
const STATUS_ICON = { pending: '🕐', confirmed: '✅', processing: '⚙️', shipped: '🚚', delivered: '🎉', cancelled: '❌' };

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getMyOrders().then(r => setOrders(r.data)).finally(() => setLoading(false)); }, []);

  if (loading) return <div className="loading-screen">Loading orders...</div>;

  return (
    <div className="profile-page page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 10 }}>No orders yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Start shopping and your orders will appear here.</p>
            <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card-ui">
                <div className="order-header-row">
                  <div>
                    <div className="order-id-text">Order #{order._id.slice(-8).toUpperCase()}</div>
                    <div className="order-date-text">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  <span className={`badge ${STATUS_BADGE[order.status]}`}>
                    {STATUS_ICON[order.status]} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="order-items-chips">
                  {order.items.slice(0, 4).map((item, i) => (
                    <span key={i} className="order-chip">{item.name} × {item.quantity}</span>
                  ))}
                  {order.items.length > 4 && <span className="order-chip">+{order.items.length - 4} more</span>}
                </div>
                <div className="order-footer-row">
                  <div className="order-addr-text">📍 {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.mobile}</div>
                  <div className="order-total-text">₹{order.totalAmount}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
