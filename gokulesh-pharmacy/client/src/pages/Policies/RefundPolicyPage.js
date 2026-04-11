import React from 'react';
import { Link } from 'react-router-dom';
import PolicyPageShell from './PolicyPageShell';

export default function RefundPolicyPage() {
  return (
    <PolicyPageShell
      title="Refund & Cancellation Policy"
      documentTitle="Refund & Cancellation Policy | Gokulesh Pharmacy"
      lead="This policy explains when you may cancel an order, request a return or refund, and how refunds are processed for Ayurvedic, food, and related products sold by Gokulesh Pharmacy."
    >
      <p className="policy-meta">
        <strong>Last updated:</strong> April 2026. This policy works together with our{' '}
        <Link to="/terms-and-conditions">Terms &amp; Conditions</Link> and{' '}
        <Link to="/payment-policy">payment terms</Link>.
      </p>

      <section className="policy-block">
        <h2>1. Introduction</h2>
        <p>
          We want you to be satisfied with your purchase. Because many of our products are consumables and
          Ayurvedic preparations, returns and refunds are subject to hygiene, safety, and regulatory
          considerations described below.
        </p>
      </section>

      <section className="policy-block">
        <h2>2. Order cancellation (before dispatch)</h2>
        <ul>
          <li>
            You may request <strong>cancellation</strong> of an order before it is handed over to the courier,
            subject to our confirmation. Contact us immediately with your order ID.
          </li>
          <li>
            If payment was made online and the order is successfully cancelled before dispatch, a refund will
            be initiated as per Section 5.
          </li>
          <li>
            Once the order is <strong>dispatched</strong>, cancellation may not be possible; you may instead
            follow the return/refund process where eligible.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>3. Returns &amp; refunds — eligibility</h2>
        <p>We may accept returns and issue refunds in cases such as:</p>
        <ul>
          <li>
            <strong>Wrong product</strong> delivered (different item or variant than ordered);
          </li>
          <li>
            <strong>Damaged or defective</strong> product received (subject to verification, including
            photos where requested);
          </li>
          <li>
            <strong>Significantly expired</strong> or unfit product where not caused by misuse or storage
            after delivery;
          </li>
          <li>
            <strong>Legal requirements</strong> under applicable consumer laws in India.
          </li>
        </ul>
        <p>The following are generally <strong>not eligible</strong> for return:</p>
        <ul>
          <li>Opened or partially consumed food or Ayurvedic products (unless defective/wrong item);</li>
          <li>Products damaged due to misuse, improper storage, or after delivery acceptance;</li>
          <li>Items marked non-returnable at the time of purchase (if any);</li>
          <li>Perishable items after the safe consumption window has passed due to customer delay.</li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>4. How to request a return or refund</h2>
        <ol>
          <li>
            Contact us within <strong>7 (seven) calendar days</strong> of delivery (or as stated on your order
            confirmation) via <Link to="/contact-us">Contact Us</Link>, email, or phone.
          </li>
          <li>
            Provide your <strong>order ID</strong>, registered mobile or email, clear description of the issue,
            and photographs if the product is damaged or incorrect.
          </li>
          <li>
            Our team will review and may arrange pickup or ask you to dispose of the product safely, depending
            on the case.
          </li>
          <li>
            Approved refunds are processed as described in Section 5. We reserve the right to refuse
            requests that do not meet this policy or appear abusive.
          </li>
        </ol>
      </section>

      <section className="policy-block">
        <h2>5. Refund method &amp; timelines</h2>
        <ul>
          <li>
            <strong>Online payments (e.g. PhonePe / UPI / card):</strong> Refunds, when approved, are
            processed back through the original payment route where technically possible, in line with our
            payment partner and your bank’s timelines (typically <strong>5–10 business days</strong> after
            approval; banks may take longer).
          </li>
          <li>
            <strong>Cash on Delivery (COD):</strong> Refunds may be issued via <strong>bank transfer</strong>{' '}
            (you must provide valid bank details) or <strong>store credit</strong> at our discretion, after
            verification.
          </li>
          <li>
            Shipping charges may be non-refundable except where the return is due to our error or a defective
            / wrong shipment, as determined by us.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>6. Failed or duplicate online payments</h2>
        <p>
          If an amount is debited but no order is confirmed, contact us with transaction details. We will
          coordinate with our payment partner to investigate. See also our{' '}
          <Link to="/payment-policy">Payments &amp; PhonePe Gateway</Link> policy.
        </p>
      </section>

      <section className="policy-block">
        <h2>7. Contact</h2>
        <p>
          <strong>Email:</strong> gokuleshpharmacy1954@gmail.com<br />
          <strong>Phone:</strong> +91 93193 76279<br />
          <strong>Address:</strong> 121/13 Kishan Ganga lal Darwaja, Infront Of Saraswati Shishu Mandir
          School, Mathura-281001, Uttar Pradesh, India.
        </p>
      </section>
    </PolicyPageShell>
  );
}
