import React, { useEffect, useState } from 'react';
import { adminGetUsers } from '../../utils/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminGetUsers().then(r => setUsers(r.data));
  }, []);

  const filteredUsers = users.filter(u => {
    const q = search.trim().toLowerCase();
    if (!q) return true;

    const name = (u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const mobile = (u.mobile || '').toLowerCase();
    const city = (u.address?.city || '').toLowerCase();

    return (
      name.includes(q) ||
      email.includes(q) ||
      mobile.includes(q) ||
      city.includes(q)
    );
  });

  return (
    <div>
      <h2 className="admin-page-title">
        Customers ({filteredUsers.length}/{users.length})
      </h2>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <span className="admin-table-header-title">All Customers</span>
          <div className="admin-search-wrap">
            <input
              type="text"
              className="admin-search"
              placeholder="Search by name, email, mobile..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="admin-search-icon">🔍</span>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u._id}>
                <td>{u.name || '–'}</td>
                <td>{u.email || '–'}</td>
                <td>{u.mobile || '–'}</td>
                <td>{u.address?.city || '–'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
