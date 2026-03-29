/**
 * Human-readable payment labels for orders (stored value → admin / account UI).
 */
export function formatPaymentMethod(raw) {
  const key = String(raw || 'COD').trim();
  const upper = key.toUpperCase();

  if (upper === 'COD') return 'Cash on Delivery (COD)';
  if (upper === 'PHONEPE') return 'Online — PhonePe (UPI / Card / Netbanking)';
  if (upper === 'ONLINE') return 'Online payment';
  if (upper === 'UPI') return 'UPI';
  if (upper === 'CARD') return 'Card';
  if (upper === 'NETBANKING') return 'Net banking';

  return key || '—';
}
