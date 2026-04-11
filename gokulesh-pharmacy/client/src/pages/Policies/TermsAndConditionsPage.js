import React from 'react';
import { Link } from 'react-router-dom';
import PolicyPageShell from './PolicyPageShell';

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageShell
      title="Terms & Conditions"
      documentTitle="Terms & Conditions | Gokulesh Pharmacy"
      lead="These terms govern your access to and use of the Gokulesh Pharmacy website, mobile experience (if any), and the purchase of our products. Please read them carefully before placing an order."
    >
      <p className="policy-meta">
        <strong>Last updated:</strong> April 2026. Continued use of our services after changes constitutes
        acceptance of the updated terms where permitted by law.
      </p>

      <section className="policy-block">
        <h2>1. Introduction &amp; acceptance</h2>
        <p>
          By accessing <strong>gokuleshpharmacy.com</strong> (or any official Gokulesh Pharmacy online
          property), creating an account, or placing an order, you agree to these Terms &amp; Conditions and
          our <Link to="/privacy-policy">Privacy Policy</Link>,{' '}
          <Link to="/refund-policy">Refund &amp; Cancellation Policy</Link>, and{' '}
          <Link to="/shipping-policy">Shipping &amp; Delivery Policy</Link>.
        </p>
      </section>

      <section className="policy-block">
        <h2>2. About us</h2>
        <p>
          Gokulesh Pharmacy offers traditional Ayurvedic and related wellness products (including churan,
          goli, mukhwas, achar, masala, and similar items) for sale online within India, subject to
          availability and delivery coverage.
        </p>
      </section>

      <section className="policy-block">
        <h2>3. Eligibility &amp; account</h2>
        <ul>
          <li>You must be at least <strong>18 years</strong> of age and capable of entering a binding contract.</li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials and for all
            activity under your account. Notify us immediately of any unauthorised use.
          </li>
          <li>
            Information you provide must be accurate and current. We may suspend or terminate accounts that
            violate these terms or misuse our services.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>4. Products &amp; product information</h2>
        <ul>
          <li>
            Product descriptions, images, ingredients, and wellness-related information are for general
            information only and are not a substitute for professional medical advice.
          </li>
          <li>
            Ayurvedic and natural products may vary slightly in appearance, texture, or taste due to
            seasonal or batch differences.
          </li>
          <li>
            If you have allergies, medical conditions, or are pregnant or nursing, consult a qualified
            healthcare provider before use.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>5. Orders, pricing &amp; payment</h2>
        <ul>
          <li>
            Placing an order constitutes an offer to purchase. We may accept, decline, or limit quantities
            for operational, legal, or stock reasons.
          </li>
          <li>
            Prices are listed in <strong>Indian Rupees (INR)</strong> and are inclusive of applicable GST
            unless stated otherwise. Delivery charges and discounts are calculated at checkout as per our
            published rules.
          </li>
          <li>
            Payment options include <strong>Cash on Delivery (COD)</strong> and, where available,{' '}
            <strong>online payment</strong> via our authorised gateway (PhonePe). Online payments are subject
            to the <Link to="/payment-policy">Payments &amp; PhonePe Gateway</Link> policy.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>6. User responsibilities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for any unlawful purpose or in violation of applicable regulations;</li>
          <li>Attempt to gain unauthorised access to our systems, other users’ data, or third-party services;</li>
          <li>Scrape, overload, or interfere with the normal operation of the site;</li>
          <li>Misrepresent your identity or submit fraudulent orders or payment information.</li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>7. Intellectual property</h2>
        <p>
          All content on this website (text, graphics, logos, layout) is owned by or licensed to Gokulesh
          Pharmacy and is protected by applicable intellectual property laws. You may not copy, modify, or
          distribute such content without our prior written consent.
        </p>
      </section>

      <section className="policy-block">
        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Gokulesh Pharmacy shall not be liable for any indirect,
          incidental, special, or consequential damages arising from use of the website or products. Our
          total liability for any claim relating to a specific order shall not exceed the amount paid by you
          for that order. Nothing in these terms excludes liability that cannot be excluded under applicable
          consumer protection laws.
        </p>
      </section>

      <section className="policy-block">
        <h2>9. Governing law &amp; disputes</h2>
        <p>
          These terms are governed by the laws of <strong>India</strong>. Courts at{' '}
          <strong>Mathura, Uttar Pradesh</strong> shall have exclusive jurisdiction, subject to any
          mandatory consumer protection provisions that apply to you.
        </p>
      </section>

      <section className="policy-block">
        <h2>10. Contact</h2>
        <p>
          Questions about these terms: <Link to="/contact-us">Contact Us</Link> or email{' '}
          <strong>gokuleshpharmacy1954@gmail.com</strong>, phone <strong>+91 93193 76279</strong>.
        </p>
      </section>
    </PolicyPageShell>
  );
}
