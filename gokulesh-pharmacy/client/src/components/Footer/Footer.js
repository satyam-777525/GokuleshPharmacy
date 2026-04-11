import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { CATEGORY_QUICK_LINKS } from '../../constants/categoryRoutes';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://wa.me/919319376279" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-col footer-col-quick">
            <h4>Quick Links</h4>
            <ul className="footer-quick-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              {CATEGORY_QUICK_LINKS.map((c) => (
                <li key={c.path}>
                  <Link to={`/category/${c.path}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col-policies">
            <h4>Legal &amp; Policies</h4>
            <ul>
              <li><Link to="/policies">All Policies</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/refund-policy">Refund &amp; Cancellation</Link></li>
              <li><Link to="/shipping-policy">Shipping &amp; Delivery</Link></li>
              <li><Link to="/payment-policy">Payments (PhonePe)</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-col-contact">
            <h4>Contact</h4>
            <div className="contact-item">
              <FaPhone aria-hidden />
              <a href="tel:+919319376279">+91 93193 76279</a>
            </div>
            <div className="contact-item">
              <FaEnvelope aria-hidden />
              <a href="mailto:gokuleshpharmacy1954@gmail.com">gokuleshpharmacy1954@gmail.com</a>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt aria-hidden />
              <span>121/13 Kishan Ganga lal Darwaja, Infront Of Saraswati Shishu Mandir School, Mathura-281001</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Gokulesh Pharmacy. All Rights Reserved.</span>
          <span className="footer-credit">
            Website Designed by <strong>Satyam Varshney</strong>
            {' · '}
            <a href="https://www.linkedin.com/in/satyam-varshney-5255a92b1/" target="_blank" rel="noopener noreferrer">Contact Developer</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
