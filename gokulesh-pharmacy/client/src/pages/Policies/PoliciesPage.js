import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PoliciesPage.css';

const SECTIONS = [
  { id: 'privacy', title: 'Privacy Policy', icon: '🔒' },
  { id: 'terms', title: 'Terms & Conditions', icon: '📋' },
  { id: 'refund', title: 'Refund & Return Policy', icon: '↩️' },
  { id: 'shipping', title: 'Shipping Policy', icon: '🚚' },
  { id: 'payment-gateway', title: 'Payment Gateway (PhonePe)', icon: '💳' },
];

const PATH_TO_SECTION = {
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/refund-policy': 'refund',
  '/shipping-policy': 'shipping',
};

export default function PoliciesPage() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const sectionId = hash?.slice(1) || PATH_TO_SECTION[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname, hash]);

  return (
    <div className="policies-page page">
      <div className="container">
        <h1 className="page-title">Policies</h1>
        <p className="policies-intro">
          Please read these policies carefully. By using Gokulesh Pharmacy and our payment services, you agree to these terms.
        </p>

        <nav className="policies-nav">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.icon} {s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="policies-content">
          {/* Privacy Policy */}
          <section id="privacy" className="policy-section">
            <h2>🔒 Privacy Policy</h2>
            <p><strong>Last updated:</strong> As applicable. We may update this policy from time to time.</p>
            <p>Gokulesh Pharmacy (“we”, “our”) respects your privacy. We collect and use information necessary to process orders, improve our services, and comply with law.</p>
            <ul>
              <li><strong>Information we collect:</strong> Name, email, mobile number, delivery address, order history, and payment-related data when you place an order or register.</li>
              <li><strong>How we use it:</strong> To process orders, deliver products, communicate with you, and improve our website and services.</li>
              <li><strong>Sharing:</strong> We may share data with delivery partners and our payment gateway (PhonePe) only as required to complete transactions and comply with law.</li>
              <li><strong>Security:</strong> We use industry-standard measures to protect your data. Payment details are processed securely by our payment partner.</li>
              <li><strong>Your rights:</strong> You may request access, correction, or deletion of your personal data by contacting us.</li>
            </ul>
          </section>

          {/* Terms & Conditions */}
          <section id="terms" className="policy-section">
            <h2>📋 Terms & Conditions</h2>
            <p>By accessing or using gokuleshpharmacy.com (or our app/site), you agree to these Terms.</p>
            <ul>
              <li><strong>Eligibility:</strong> You must be 18+ and capable of entering a binding contract to use our services.</li>
              <li><strong>Account:</strong> You are responsible for keeping your login credentials secure and for all activity under your account.</li>
              <li><strong>Products:</strong> We strive for accuracy in descriptions and images. Ayurvedic and food products are subject to natural variation.</li>
              <li><strong>Orders:</strong> Placing an order constitutes an offer. We reserve the right to accept, decline, or limit orders. Prices are in INR and inclusive of GST where applicable.</li>
              <li><strong>Prohibited use:</strong> You may not use our site for any illegal purpose, to harm others, or to attempt to gain unauthorized access to our or third-party systems.</li>
            </ul>
          </section>

          {/* Refund & Return Policy */}
          <section id="refund" className="policy-section">
            <h2>↩️ Refund & Return Policy</h2>
            <p>We want you to be satisfied with your purchase. Please review the following.</p>
            <ul>
              <li><strong>Eligibility:</strong> Returns/refunds may be permitted for defective, wrong, or damaged products, or as required by law. Perishable or opened consumable products may not be returnable.</li>
              <li><strong>Process:</strong> Contact us within the period stated at checkout or on the order confirmation (e.g. 7 days for non-perishables). Provide order ID and reason. We may request photos or return of the product.</li>
              <li><strong>Refund method:</strong> Refunds for online payments will be processed to the original payment mode (e.g. UPI/card via PhonePe) as per our payment partner’s and bank timelines (typically 5–10 business days).</li>
              <li><strong>COD:</strong> For cash-on-delivery orders, any refund will be issued via bank transfer or store credit as per our discretion.</li>
            </ul>
          </section>

          {/* Shipping Policy */}
          <section id="shipping" className="policy-section">
            <h2>🚚 Shipping Policy</h2>
            <ul>
              <li><strong>Delivery areas:</strong> We currently ship within India. Serviceability depends on pin code and partner availability.</li>
              <li><strong>Timelines:</strong> Estimated delivery is shown at checkout. Delays due to logistics, weather, or customs (if applicable) are not always within our control.</li>
              <li><strong>Charges:</strong> Shipping charges or free-shipping thresholds (e.g. free delivery above a cart value) are displayed at checkout.</li>
              <li><strong>Tracking:</strong> Where available, we will share tracking details via email/SMS.</li>
            </ul>
          </section>

          {/* Payment Gateway (PhonePe) */}
          <section id="payment-gateway" className="policy-section payment-gateway-section">
            <h2>💳 Payment Gateway (PhonePe)</h2>
            <p>
              Gokulesh Pharmacy uses <strong>PhonePe Payment Gateway</strong> for secure online payments. When you choose “Online Payment”, you are redirected to PhonePe’s hosted payment page to complete the transaction.
            </p>
            <ul>
              <li><strong>Issuer of the gateway:</strong> Payment processing services are provided by PhonePe (PhonePe Private Limited or its authorized partners). We do not store your full card number or UPI PIN; these are handled securely by PhonePe.</li>
              <li><strong>Accepted methods:</strong> UPI, debit/credit cards, net banking, and other methods as made available on the PhonePe payment page.</li>
              <li><strong>Security:</strong> PhonePe is PCI-DSS compliant. All payment data is encrypted. You should only enter payment details on the official PhonePe payment page (check the URL and padlock icon).</li>
              <li><strong>Failed or disputed payments:</strong> If your payment fails or is debited but the order is not confirmed, contact us with your order reference and transaction ID. We will coordinate with PhonePe to resolve the issue. Disputes and chargebacks are handled as per PhonePe’s and card network rules.</li>
              <li><strong>Refunds for online payments:</strong> Refunds for orders paid via PhonePe will be processed back through PhonePe to the same instrument (UPI/card/bank account) as per PhonePe’s and bank timelines.</li>
              <li><strong>Terms of the gateway:</strong> Use of PhonePe’s payment services is also subject to PhonePe’s terms and privacy policy. By paying online, you agree to those terms to the extent they apply to your transaction.</li>
            </ul>
            <p className="policy-contact">
              For payment or gateway-related queries: <strong>support@gokuleshpharmacy.com</strong> or our contact number. For issues directly with your bank or UPI app, please contact your bank or PhonePe support.
            </p>
          </section>
        </div>

        <div className="policies-footer-cta">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
