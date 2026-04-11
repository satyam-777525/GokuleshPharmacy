import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const LINKS = [
  {
    to: '/privacy-policy',
    title: 'Privacy Policy',
    desc: 'How we collect, use, store, and protect your personal information.'
  },
  {
    to: '/terms-and-conditions',
    title: 'Terms & Conditions',
    desc: 'Rules for using our website, placing orders, and your responsibilities as a customer.'
  },
  {
    to: '/refund-policy',
    title: 'Refund & Cancellation Policy',
    desc: 'Returns, refunds, cancellations, and timelines for Ayurvedic and food products.'
  },
  {
    to: '/shipping-policy',
    title: 'Shipping & Delivery Policy',
    desc: 'Delivery areas, timelines, charges, and how we ship your orders across India.'
  },
  {
    to: '/payment-policy',
    title: 'Payments & PhonePe Gateway',
    desc: 'How online payments work, security, and our partnership with PhonePe.'
  },
  {
    to: '/contact-us',
    title: 'Contact Us',
    desc: 'Reach our team for orders, support, and business enquiries.'
  }
];

export default function PoliciesIndexPage() {
  useEffect(() => {
    document.title = 'Policies & Legal | Gokulesh Pharmacy';
  }, []);

  return (
    <div className="policy-page page">
      <div className="container policy-page-inner">
        <header className="policy-page-header">
          <h1 className="page-title" style={{ marginBottom: 12 }}>
            Policies &amp; legal information
          </h1>
          <p className="policies-index-intro">
            Gokulesh Pharmacy is committed to transparency. Below you will find our privacy practices,
            terms of use, refund and shipping rules, payment information, and contact details. Please read
            these documents before placing an order. By using our website and services, you agree to the
            applicable terms.
          </p>
        </header>

        <div className="policies-index-grid">
          {LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="policies-index-card">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <div className="policy-card-arrow">Read document →</div>
            </Link>
          ))}
        </div>

        <div className="policy-page-actions" style={{ marginTop: 40 }}>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
