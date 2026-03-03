import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, changePassword } from '../../utils/api';
import toast from 'react-hot-toast';
import './Profile.css';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', mobile: user?.mobile || '',
    street: user?.address?.street || '', city: user?.address?.city || '',
    state: user?.address?.state || '', pincode: user?.address?.pincode || '',
  });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await updateProfile({ name: form.name, email: form.email, mobile: form.mobile, address: { street: form.street, city: form.city, state: form.state, pincode: form.pincode } });
      login(localStorage.getItem('gp_token'), res.data);
      toast.success('Profile updated successfully!');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  const NAV = [
    { key: 'profile', icon: '👤', label: 'My Profile' },
    { key: 'address', icon: '📍', label: 'Addresses' },
    { key: 'password', icon: '🔒', label: 'Change Password' },
  ];

  return (
    <div className="profile-page page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-avatar">{initials}</div>
              <div className="profile-user-name">{user?.name || 'My Account'}</div>
              <div className="profile-user-email">{user?.email || user?.mobile || ''}</div>
            </div>
            <div className="profile-nav-card">
              {NAV.map(n => (
                <button key={n.key} className={`profile-nav-item ${tab === n.key ? 'active' : ''}`} onClick={() => setTab(n.key)}>
                  <span className="nav-icon">{n.icon}</span> {n.label}
                </button>
              ))}
              <Link to="/orders" className="profile-nav-item">
                <span className="nav-icon">📦</span> My Orders
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div>
            {tab === 'profile' && (
              <div className="profile-content-card">
                <h2 className="profile-section-title">My Profile</h2>
                <form onSubmit={handleProfileSave}>
                  <div className="form-row-2">
                    <div className="form-group"><label>Full Name</label>
                      <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" /></div>
                    <div className="form-group"><label>Mobile Number</label>
                      <input type="tel" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="10-digit mobile" /></div>
                  </div>
                  <div className="form-group"><label>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" /></div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {tab === 'address' && (
              <div className="profile-content-card">
                <h2 className="profile-section-title">Delivery Address</h2>
                <form onSubmit={handleProfileSave}>
                  <div className="form-group"><label>Street Address</label>
                    <input value={form.street} onChange={e => setForm(p => ({ ...p, street: e.target.value }))} placeholder="House no, Street, Area, Landmark" /></div>
                  <div className="form-row-3">
                    <div className="form-group"><label>City</label>
                      <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} /></div>
                    <div className="form-group"><label>State</label>
                      <input value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} /></div>
                    <div className="form-group"><label>Pincode</label>
                      <input value={form.pincode} onChange={e => setForm(p => ({ ...p, pincode: e.target.value }))} /></div>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>Save Address</button>
                </form>
              </div>
            )}

            {tab === 'password' && (
              <div className="profile-content-card">
                <h2 className="profile-section-title">Change Password</h2>
                <form onSubmit={handlePasswordChange} style={{ maxWidth: 440 }}>
                  <div className="form-group"><label>Current Password</label>
                    <input type="password" value={pwForm.currentPassword} onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))} required /></div>
                  <div className="form-group"><label>New Password</label>
                    <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} required /></div>
                  <div className="form-group"><label>Confirm New Password</label>
                    <input type="password" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} required /></div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>Change Password</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
