import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { login as loginAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', mobile: '', password: '', loginType: 'email' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = form.loginType === 'email'
        ? { email: form.email, password: form.password }
        : { mobile: form.mobile, password: form.password };
      const res = await loginAPI(payload);
      login(res.data.token, res.data.user);
      toast.success('Welcome back! 🌿');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><FaLeaf /></div>
          <span>Gokulesh Pharmacy</span>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <div className="login-tabs">
          <button className={form.loginType === 'email' ? 'active' : ''} onClick={() => setForm(p => ({ ...p, loginType: 'email' }))}>📧 Email</button>
          <button className={form.loginType === 'mobile' ? 'active' : ''} onClick={() => setForm(p => ({ ...p, loginType: 'mobile' }))}>📱 Mobile</button>
        </div>

        <form onSubmit={handleSubmit}>
          {form.loginType === 'email' ? (
            <div className="form-group"><label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required /></div>
          ) : (
            <div className="form-group"><label>Mobile Number</label>
              <input type="tel" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="10-digit mobile number" required /></div>
          )}
          <div className="form-group"><label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required /></div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}
