import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './PolicyPages.css';

export default function ContactUsPage() {
  useEffect(() => {
    document.title = 'Contact Us | Gokulesh Pharmacy';
  }, []);

  return (
    <article className="policy-page page">
      <div className="container policy-page-inner">
        <nav className="policy-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/policies">Policies</Link>
          <span aria-hidden="true">/</span>
          <span>Contact Us</span>
        </nav>

        <header className="policy-page-header">
          <h1>Contact Us</h1>
          <p className="policy-page-lead">
            We are here to help with orders, product questions, delivery, payments, and partnerships. Reach us
            through any of the channels below.
          </p>
        </header>

        <div className="policy-page-card">
          <div className="contact-grid">
            <div className="contact-card">
              <h3>
                <FaPhone style={{ marginRight: 8, color: 'var(--primary)', verticalAlign: 'middle' }} />
                Phone
              </h3>
              <p>
                <a href="tel:+919319376279">+91 93193 76279</a>
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                For order status, delivery, and product enquiries during business hours.
              </p>
            </div>

            <div className="contact-card">
              <h3>
                <FaEnvelope style={{ marginRight: 8, color: 'var(--primary)', verticalAlign: 'middle' }} />
                Email
              </h3>
              <p>
                <a href="mailto:gokuleshpharmacy1954@gmail.com">gokuleshpharmacy1954@gmail.com</a>
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                We aim to respond within 1–2 business days. Include your order ID if applicable.
              </p>
            </div>

            <div className="contact-card">
              <h3>
                <FaMapMarkerAlt style={{ marginRight: 8, color: 'var(--primary)', verticalAlign: 'middle' }} />
                Registered address
              </h3>
              <p>
                121/13 Kishan Ganga lal Darwaja,
                <br />
                Infront Of Saraswati Shishu Mandir School,
                <br />
                Mathura — 281001
                <br />
                Uttar Pradesh, India
              </p>
            </div>

            <div className="contact-card">
              <h3>
                <FaClock style={{ marginRight: 8, color: 'var(--primary)', verticalAlign: 'middle' }} />
                Business hours
              </h3>
              <p>
                Monday to Saturday: 10:00 AM – 6:00 PM IST
                <br />
                Sunday: Closed (or limited support — enquiries via email)
              </p>
            </div>
          </div>

          <section className="policy-block" style={{ marginTop: 28 }}>
            <h2>What can we help you with?</h2>
            <ul>
              <li>Order placement, modification, or cancellation (before dispatch)</li>
              <li>Delivery delays, address changes, or tracking</li>
              <li>Returns, refunds, and payment issues (including PhonePe)</li>
              <li>Product information, ingredients, and storage guidance</li>
              <li>Wholesale or business enquiries (subject to our review)</li>
            </ul>
          </section>

          <section className="policy-block">
            <h2>Legal &amp; policy documents</h2>
            <p>
              For formal policies, please visit our{' '}
              <Link to="/policies">Policies hub</Link> or read the{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>,{' '}
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>, and{' '}
              <Link to="/payment-policy">Payments &amp; PhonePe</Link> pages.
            </p>
          </section>
        </div>

        <div className="policy-page-actions">
          <Link to="/policies" className="btn btn-outline">
            All policies
          </Link>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </article>
  );
}
