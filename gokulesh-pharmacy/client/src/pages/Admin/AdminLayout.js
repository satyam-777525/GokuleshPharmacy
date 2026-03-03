import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLeaf, FaTachometerAlt, FaBoxOpen, FaTags, FaClipboardList, FaUsers, FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const NAV = [
  { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin/products', icon: <FaBoxOpen />, label: 'Products' },
  { to: '/admin/categories', icon: <FaTags />, label: 'Categories' },
  { to: '/admin/orders', icon: <FaClipboardList />, label: 'Orders' },
  { to: '/admin/users', icon: <FaUsers />, label: 'Users' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <FaLeaf />
          <div>
            <div>Gokulesh</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Admin Panel</div>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`admin-nav-item ${location.pathname === item.to ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <button className="admin-logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="admin-topbar-title">Gokulesh Pharmacy Admin</span>
          <Link to="/" className="admin-view-site">← View Site</Link>
        </header>
        <div className="admin-content">{children}</div>
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
