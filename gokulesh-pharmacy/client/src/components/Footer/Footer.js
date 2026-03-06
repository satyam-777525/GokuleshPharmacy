import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon"><FaLeaf /></div>
              <div>
                <div className="footer-logo-name">Gokulesh Pharmacy</div>
                <div className="footer-logo-tag">Pure Ayurvedic Products</div>
              </div>
            </div>
            <p>We bring you the finest traditional Ayurvedic products — churan, goli, mukhwas, and more — crafted with ancient wisdom for modern wellness.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=churan">Churan</Link></li>
              <li><Link to="/products?category=goli">Goli</Link></li>
              <li><Link to="/products?category=mukhwas">Mukhwas</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/policies">All Policies</Link></li>
              <li><Link to="/policies#privacy">Privacy Policy</Link></li>
              <li><Link to="/policies#terms">Terms & Conditions</Link></li>
              <li><Link to="/policies#refund">Refund Policy</Link></li>
              <li><Link to="/policies#shipping">Shipping Policy</Link></li>
              <li><Link to="/policies#payment-gateway">Payment (PhonePe)</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <FaPhone />
              <span>+91 93193 76279</span>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <span>gokuleshpharmacy1954@gmail.com</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>121/13 Kishan Ganga lal Darwaja, Infront Of Saraswati Shishu Mandir School, Mathura-281001</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2024 Gokulesh Pharmacy. All Rights Reserved.</span>
          <span>Made by Satyam Varshney</span>
        </div>
      </div>
    </footer>
  );
}
