import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { register } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (!form.email && !form.mobile) return toast.error('Email or mobile required');
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email || undefined, mobile: form.mobile || undefined, password: form.password });
      login(res.data.token, res.data.user);
      toast.success('Account created! Welcome 🌿');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><FaLeaf /></div>
          <span>Gokulesh Pharmacy</span>
        </div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join thousands of happy customers</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" /></div>
          <div className="form-group"><label>Email (or provide mobile)</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" /></div>
          <div className="form-group"><label>Mobile Number (or provide email)</label>
            <input type="tel" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="10-digit mobile" /></div>
          <div className="form-group"><label>Password *</label>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min 6 characters" required /></div>
          <div className="form-group"><label>Confirm Password *</label>
            <input type="password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} placeholder="Re-enter password" required /></div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}
