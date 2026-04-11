import React from 'react';
import { Link } from 'react-router-dom';
import PolicyPageShell from './PolicyPageShell';

export default function ShippingPolicyPage() {
  return (
    <PolicyPageShell
      title="Shipping & Delivery Policy"
      documentTitle="Shipping & Delivery Policy | Gokulesh Pharmacy"
      lead="This policy describes how Gokulesh Pharmacy ships orders within India, estimated timelines, delivery charges, and your responsibilities at the time of delivery."
    >
      <p className="policy-meta">
        <strong>Last updated:</strong> April 2026. Delivery charges and free-delivery thresholds shown at
        checkout apply to your order.
      </p>

      <section className="policy-block">
        <h2>1. Delivery coverage</h2>
        <p>
          We currently ship to addresses within <strong>India</strong> where our logistics partners service
          the pin code. Serviceability is confirmed at checkout based on your delivery address. We may update
          coverage from time to time.
        </p>
      </section>

      <section className="policy-block">
        <h2>2. Processing time</h2>
        <p>
          Orders are typically processed within <strong>1–3 business days</strong> after confirmation (excluding
          public holidays and high-demand periods). You will receive updates by SMS, email, or on your account
          where available.
        </p>
      </section>

      <section className="policy-block">
        <h2>3. Estimated delivery timelines</h2>
        <p>
          After dispatch, estimated delivery is usually <strong>3–10 business days</strong> depending on
          destination, courier, and weather or operational conditions. These are estimates only, not
          guarantees. Remote or rural areas may require additional time.
        </p>
      </section>

      <section className="policy-block">
        <h2>4. Shipping charges &amp; free delivery</h2>
        <p>
          Delivery fees (if any) and any <strong>free delivery</strong> threshold are calculated at checkout
          based on your cart subtotal and our current rules. You will see the final shipping amount before you
          pay. We reserve the right to adjust published thresholds with notice on the website where required.
        </p>
      </section>

      <section className="policy-block">
        <h2>5. Packaging</h2>
        <p>
          Products are packed to protect quality during transit. Ayurvedic and food items are sealed where
          appropriate. Please inspect the package on receipt and report obvious outer damage to the delivery
          partner and to us promptly.
        </p>
      </section>

      <section className="policy-block">
        <h2>6. Tracking</h2>
        <p>
          Where our partner provides tracking, we will share tracking information via SMS, email, or your
          order details page. Tracking updates depend on the courier and may not be real-time.
        </p>
      </section>

      <section className="policy-block">
        <h2>7. Delivery attempts &amp; undelivered orders</h2>
        <ul>
          <li>
            Please ensure someone is available at the address with the registered mobile reachable for OTP or
            confirmation where required.
          </li>
          <li>
            If delivery fails due to incorrect address, refusal, or repeated unavailability, the order may be
            returned to us. Additional shipping charges may apply for re-dispatch. Refunds, if any, follow our{' '}
            <Link to="/refund-policy">Refund &amp; Cancellation Policy</Link>.
          </li>
        </ul>
      </section>

      <section className="policy-block">
        <h2>8. Delays outside our control</h2>
        <p>
          We are not liable for delays caused by natural disasters, strikes, government restrictions, courier
          failures, or other force majeure events. We will use reasonable efforts to inform you of significant
          delays when practicable.
        </p>
      </section>

      <section className="policy-block">
        <h2>9. Contact</h2>
        <p>
          For shipping queries: <Link to="/contact-us">Contact Us</Link> —{' '}
          <strong>gokuleshpharmacy1954@gmail.com</strong> | <strong>+91 93193 76279</strong>.
        </p>
      </section>
    </PolicyPageShell>
  );
}
