/**
 * Order pricing rules — keep in sync with server/services/orderService.js (calculateTotals).
 * Subtotal = sum of line items before discount. Delivery is based on subtotal, not discounted total.
 */
export const FREE_DELIVERY_MIN_SUBTOTAL = 999;
export const DELIVERY_CHARGE_RUPEES = 100;

/** Auto 10% off when subtotal is ₹1999 or more (same rule style as former ₹999 threshold). */
export const AUTO_COUPON = {
  code: 'GOKULESH10',
  minSubtotal: 1999,
  percentOff: 10
};

export function getDeliveryChargeRupees(subtotal) {
  return subtotal >= FREE_DELIVERY_MIN_SUBTOTAL ? 0 : DELIVERY_CHARGE_RUPEES;
}

export function rupeesUntilFreeDelivery(subtotal) {
  return Math.max(0, FREE_DELIVERY_MIN_SUBTOTAL - subtotal);
}

export function rupeesUntilAutoDiscount(subtotal) {
  return Math.max(0, AUTO_COUPON.minSubtotal - subtotal);
}
