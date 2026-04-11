import React from 'react';
import { Link } from 'react-router-dom';
import PolicyPageShell from './PolicyPageShell';

export default function PaymentPolicyPage() {
  return (
    <PolicyPageShell
      title="Payments & PhonePe Gateway"
      documentTitle="Payments & PhonePe | Gokulesh Pharmacy"
      lead="Gokulesh Pharmacy uses authorised payment methods for your security. Online payments are processed through PhonePe Payment Gateway. This page explains how payments work, what we do not store, and how disputes are handled."
    >
      <p className="policy-meta">
        <strong>Last updated:</strong> April 2026. For general terms, see our{' '}
        <Link to="/terms-and-conditions">Terms &amp; Conditions</Link> and{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>

      <div className="policy-highlight-box">
        <p style={{ margin: 0 }}>
          <strong>Summary:</strong> When you choose &quot;Online Payment&quot;, you are redirected to{' '}
          <strong>PhonePe&apos;s secure hosted checkout</strong>. We do not collect or store your full card
          number, CVV, or UPI PIN on our servers.
        </p>
      </div>

      <section className="policy-block">
        <h2>1. Payment methods we offer</h2>
        <ul>
          <li>
            <strong>Cash on Delivery (COD):</strong> Pay in cash (or as accepted by the delivery partner) when
            your order is delivered, where COD is available for your location.
          </li>
          <li>
            <strong>Online payment via PhonePe:</strong> UPI, debit/credit cards, net banking, and other
            instruments made available on PhonePe&apos;s payment page at the time of checkout.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>2. Payment gateway provider</h2>
        <p>
          Online payment processing services are provided by <strong>PhonePe</strong> (PhonePe Private Limited
          and/or its authorised partners). Gokulesh Pharmacy is a merchant using PhonePe&apos;s payment
          infrastructure. Your use of PhonePe is also subject to PhonePe&apos;s terms and privacy policy.
        </p>
      </section>

      <section className="policy-block">
        <h2>3. Security &amp; PCI compliance</h2>
        <ul>
          <li>
            PhonePe is <strong>PCI-DSS</strong> compliant. Card and payment data are encrypted and handled on
            PhonePe&apos;s systems.
          </li>
          <li>
            Only enter payment credentials on the <strong>official PhonePe payment page</strong>. Verify the
            URL and browser padlock (HTTPS) before proceeding.
          </li>
          <li>
            We may receive limited payment metadata (e.g. transaction status, last four digits where
            applicable) for reconciliation — not your full card or UPI PIN.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>4. Order amount &amp; authorisation</h2>
        <p>
          The amount charged is the <strong>total order value</strong> calculated at checkout (including
          applicable product total, discounts, and delivery charges) as confirmed on our server before you are
          sent to PhonePe. By completing payment, you authorise the charge for that amount.
        </p>
      </section>

      <section className="policy-block">
        <h2>5. Failed, pending, or duplicate payments</h2>
        <ul>
          <li>
            If payment <strong>fails</strong>, no order is completed until you successfully pay or choose COD
            (where available).
          </li>
          <li>
            If money is <strong>debited</strong> but your order is not confirmed, contact us immediately with
            your transaction reference. We will work with PhonePe and you to investigate.
          </li>
          <li>
            Resolution timelines depend on banks, card networks, and PhonePe — typically several business
            days.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>6. Refunds for online payments</h2>
        <p>
          Approved refunds for orders paid online are routed back through <strong>PhonePe</strong> to the
          original payment instrument where possible, subject to banking and network rules. See our{' '}
          <Link to="/refund-policy">Refund &amp; Cancellation Policy</Link> for eligibility and timelines.
        </p>
      </section>

      <section className="policy-block">
        <h2>7. Chargebacks &amp; disputes</h2>
        <p>
          Payment disputes and chargebacks are handled under <strong>PhonePe</strong>, card network, and
          banking rules. We will provide reasonable cooperation and order records when required to resolve
          legitimate disputes.
        </p>
      </section>

      <section className="policy-block">
        <h2>8. Contact for payment issues</h2>
        <p>
          <strong>Gokulesh Pharmacy:</strong> gokuleshpharmacy1954@gmail.com | +91 93193 76279 |{' '}
          <Link to="/contact-us">Contact Us</Link>
          <br />
          For bank or UPI app issues, also contact your bank or PhonePe support as appropriate.
        </p>
      </section>
    </PolicyPageShell>
  );
}
