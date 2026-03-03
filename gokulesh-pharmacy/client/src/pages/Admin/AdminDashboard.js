import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaClipboardList, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { adminDashboard } from '../../utils/api';

const STATUS_COLORS = { pending: 'badge-yellow', confirmed: 'badge-blue', delivered: 'badge-green', cancelled: 'badge-red', shipped: 'badge-blue', processing: 'badge-blue' };

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { adminDashboard().then(r => setData(r.data)); }, []);

  if (!data) return <div className="loading-screen">Loading...</div>;

  const stats = [
    { label: 'Total Products', value: data.totalProducts, icon: <FaBoxOpen />, color: '#2d6a4f' },
    { label: 'Total Orders', value: data.totalOrders, icon: <FaClipboardList />, color: '#1d4ed8' },
    { label: 'Customers', value: data.totalUsers, icon: <FaUsers />, color: '#7c3aed' },
    { label: 'Revenue', value: `₹${data.revenue?.toLocaleString('en-IN')}`, icon: <FaRupeeSign />, color: '#d4a017' },
  ];

  return (
    <div>
      <h2 className="admin-page-title">Dashboard</h2>

      <div className="admin-stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <h3>Recent Orders</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Mobile</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {data.recentOrders.map(o => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-8).toUpperCase()}</td>
                  <td>{o.user?.name || 'Guest'}</td>
                  <td>{o.shippingAddress?.mobile || o.user?.mobile || '–'}</td>
                  <td>₹{o.totalAmount}</td>
                  <td><span className={`badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
