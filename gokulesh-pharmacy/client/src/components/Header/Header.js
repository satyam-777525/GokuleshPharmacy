import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaLeaf, FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'All Products' },
  { to: '/products?cat=churan', label: 'Churan' },
  { to: '/products?cat=goli', label: 'Goli & Tablets' },
  { to: '/products?cat=mukhwas', label: 'Mukhwas' },
  { to: '/products?cat=achar', label: 'Achar & Pickles' },
  { to: '/products?cat=masala', label: 'Masala' },
  { to: '/products?featured=true', label: '🔥 Offers' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <span><FaPhoneAlt /> +91 8171171250 &nbsp;|&nbsp; Free delivery above ₹499</span>
          <span>🌿 100% Natural · No Preservatives · Trusted Since 1985</span>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <div className="logo-icon"><FaLeaf /></div>
            <div className="logo-text">
              <span className="logo-name">Gokulesh</span>
              <span className="logo-sub">Pharmacy</span>
            </div>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search churan, mukhwas, achar, masala..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
          </form>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn">
              <FaShoppingCart />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>

            {user ? (
              <div className="user-menu-wrap">
                <button className="user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="user-btn-icon">{initials}</div>
                  <span className="user-name">{user.name?.split(' ')[0] || 'Account'}</span>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      <FaUser /> My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                      📦 My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setShowUserMenu(false)}>
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Login / Register</Link>
            )}

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container nav-inner">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
          </form>
        </div>
      </nav>
    </header>
  );
}
