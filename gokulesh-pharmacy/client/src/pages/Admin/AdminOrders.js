import React, { useEffect, useState } from 'react';
import { adminGetOrders, adminUpdateOrderStatus } from '../../utils/api';
import toast from 'react-hot-toast';

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  pending: 'badge-yellow',
  confirmed: 'badge-blue',
  processing: 'badge-blue',
  shipped: 'badge-blue',
  delivered: 'badge-green',
  cancelled: 'badge-red'
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');

  const load = () => adminGetOrders().then(r => setOrders(r.data));
  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    await adminUpdateOrderStatus(id, status);
    toast.success('Status updated');
    load();
  };

  const filteredOrders = orders.filter(o => {
    const q = search.trim().toLowerCase();
    if (!q) return true;

    const id = String(o._id || '').toLowerCase();
    const shortId = id.slice(-8);
    const name = (o.user?.name || 'Guest').toLowerCase();

    return id.includes(q) || shortId.includes(q) || name.includes(q);
  });

  return (
    <div>
      <h2 className="admin-page-title">
        Orders ({filteredOrders.length}/{orders.length})
      </h2>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <span className="admin-table-header-title">All Orders</span>
          <div className="admin-search-wrap">
            <input
              type="text"
              className="admin-search"
              placeholder="Search by ID or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="admin-search-icon">🔍</span>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(o => (
              <React.Fragment key={o._id}>
                <tr
                  onClick={() =>
                    setExpanded(expanded === o._id ? null : o._id)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <td>#{o._id.slice(-8).toUpperCase()}</td>
                  <td>{o.user?.name || 'Guest'}</td>
                  <td>{o.shippingAddress?.mobile}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <span className={`badge ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={e =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      className="status-select"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expanded === o._id && (
                  <tr className="order-expand-row">
                    <td colSpan={7}>
                      <div className="order-detail-expand">
                        <div>
                          <strong>Items:</strong>{' '}
                          {o.items
                            .map(
                              i =>
                                `${i.name} ×${i.quantity} (₹${i.price})`
                            )
                            .join(', ')}
                        </div>
                        <div>
                          <strong>Address:</strong>{' '}
                          {o.shippingAddress?.street},{' '}
                          {o.shippingAddress?.city},{' '}
                          {o.shippingAddress?.state} -{' '}
                          {o.shippingAddress?.pincode}
                        </div>
                        {o.notes && (
                          <div>
                            <strong>Notes:</strong> {o.notes}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>
                  No orders match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
