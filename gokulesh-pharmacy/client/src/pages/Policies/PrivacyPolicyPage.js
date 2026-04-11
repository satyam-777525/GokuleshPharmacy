import React from 'react';
import { Link } from 'react-router-dom';
import PolicyPageShell from './PolicyPageShell';

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      documentTitle="Privacy Policy | Gokulesh Pharmacy"
      lead="This policy describes how Gokulesh Pharmacy collects, uses, discloses, and safeguards your information when you use our website and purchase Ayurvedic and related products."
    >
      <p className="policy-meta">
        <strong>Last updated:</strong> April 2026. We may update this policy from time to time; the revised
        version will be posted on this page with an updated date.
      </p>

      <section className="policy-block">
        <h2>1. Introduction</h2>
        <p>
          Gokulesh Pharmacy (“we”, “us”, “our”) operates the website and online store for Gokulesh Pharmacy.
          We respect your privacy and are committed to protecting personal data in line with applicable laws
          in India, including the Digital Personal Data Protection Act, 2023, where applicable.
        </p>
      </section>

      <section className="policy-block">
        <h2>2. Information we collect</h2>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Identity &amp; contact:</strong> Name, email address, mobile number, and delivery address
            when you register, update your profile, or place an order.
          </li>
          <li>
            <strong>Transaction data:</strong> Order history, items purchased, payment method selected (e.g.
            Cash on Delivery or online via PhonePe), and order status. We do not store your full card number
            or UPI PIN; those are handled by our payment partner.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type, device information, and cookies or
            similar technologies where used, to operate and secure the website.
          </li>
          <li>
            <strong>Communications:</strong> Messages you send us (e.g. support requests, feedback).
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>3. How we use your information</h2>
        <p>We use personal data to:</p>
        <ul>
          <li>Process, fulfil, and deliver your orders;</li>
          <li>Communicate about orders, delivery, and customer support;</li>
          <li>Verify identity and prevent fraud or abuse;</li>
          <li>Improve our products, website, and user experience;</li>
          <li>Comply with legal obligations and respond to lawful requests;</li>
          <li>Send important service-related notices (you may opt out of marketing where applicable).</li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>4. Legal basis &amp; consent</h2>
        <p>
          We process your data where necessary to perform a contract (e.g. delivering your order), to comply
          with law, or where you have given consent (e.g. marketing). You may withdraw consent where
          processing is consent-based, subject to legal and contractual limits.
        </p>
      </section>

      <section className="policy-block">
        <h2>5. Sharing of information</h2>
        <p>We may share data with:</p>
        <ul>
          <li>
            <strong>Logistics partners</strong> for delivery (name, address, phone, order details);
          </li>
          <li>
            <strong>Payment gateway providers</strong> (e.g. PhonePe) solely to process payments you
            authorise;
          </li>
          <li>
            <strong>IT and hosting providers</strong> who assist in operating our platform, under
            appropriate safeguards;
          </li>
          <li>
            <strong>Authorities</strong> when required by law or to protect rights, safety, and security.
          </li>
        </ul>
        <p>We do not sell your personal data to third parties for their marketing.</p>
      </section>

      <section className="policy-block">
        <h2>6. Data retention &amp; security</h2>
        <p>
          We retain data only as long as needed for the purposes above, including legal, tax, and accounting
          requirements. We implement reasonable technical and organisational measures to protect data against
          unauthorised access, loss, or alteration.
        </p>
      </section>

      <section className="policy-block">
        <h2>7. Your rights</h2>
        <p>Depending on applicable law, you may have the right to:</p>
        <ul>
          <li>Access or receive a copy of your personal data;</li>
          <li>Request correction of inaccurate data;</li>
          <li>Request deletion where legally permissible;</li>
          <li>Object to or restrict certain processing;</li>
          <li>Lodge a complaint with a supervisory authority.</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details on our{' '}
          <Link to="/contact-us">Contact Us</Link> page.
        </p>
      </section>

      <section className="policy-block">
        <h2>8. Children</h2>
        <p>
          Our services are not directed at children under 18. We do not knowingly collect personal data from
          children. If you believe we have done so, please contact us and we will take appropriate steps.
        </p>
      </section>

      <section className="policy-block">
        <h2>9. Contact</h2>
        <p>
          For privacy-related questions: <strong>gokuleshpharmacy1954@gmail.com</strong> or call{' '}
          <strong>+91 93193 76279</strong>. Registered address: 121/13 Kishan Ganga lal Darwaja, Infront Of
          Saraswati Shishu Mandir School, Mathura-281001, Uttar Pradesh, India.
        </p>
      </section>
    </PolicyPageShell>
  );
}
