import React, { useEffect, useState } from 'react';
import { adminGetUsers } from '../../utils/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { adminGetUsers().then(r => setUsers(r.data)); }, []);

  return (
    <div>
      <h2 className="admin-page-title">Customers ({users.length})</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>City</th><th>Joined</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name || '–'}</td>
                <td>{u.email || '–'}</td>
                <td>{u.mobile || '–'}</td>
                <td>{u.address?.city || '–'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
