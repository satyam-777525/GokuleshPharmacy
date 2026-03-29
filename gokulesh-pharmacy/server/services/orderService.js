const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'OrderError';
    this.statusCode = statusCode;
  }
}

// Auto coupon & delivery — must match client/src/constants/orderPricing.js
const AUTO_COUPON = {
  code: 'GOKULESH10',
  minSubtotal: 1999,
  percentOff: 10,
};

const FREE_DELIVERY_MIN_SUBTOTAL = 999;
const DELIVERY_CHARGE_RUPEES = 100;

function calculateTotals(subtotalAmount) {
  const isEligible = subtotalAmount >= AUTO_COUPON.minSubtotal;
  const couponCode = isEligible ? AUTO_COUPON.code : null;
  const discountAmount = isEligible ? Math.round((subtotalAmount * AUTO_COUPON.percentOff) / 100) : 0;
  // Delivery: ₹100 if subtotal < ₹999, free at ₹999+
  const shippingAmount = subtotalAmount >= FREE_DELIVERY_MIN_SUBTOTAL ? 0 : DELIVERY_CHARGE_RUPEES;
  const totalAmount = Math.max(0, subtotalAmount - discountAmount) + shippingAmount;

  return { subtotalAmount, discountAmount, couponCode, shippingAmount, totalAmount };
}

async function buildOrderItemsAndSubtotal(items) {
  let subtotalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) {
      throw new OrderError(`Product not available: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      throw new OrderError(`Insufficient stock for ${product.name}`);
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: item.quantity
    });
    subtotalAmount += product.price * item.quantity;
  }

  return { orderItems, subtotalAmount };
}

async function quoteOrderForUser({ items }) {
  if (!items?.length) {
    throw new OrderError('No items in order');
  }
  const { subtotalAmount } = await buildOrderItemsAndSubtotal(items);
  return calculateTotals(subtotalAmount);
}

async function createOrderForUser({
  userId,
  items,
  shippingAddress,
  notes,
  paymentMethod = 'COD',
  paymentDetails
}) {
  if (!items?.length) {
    throw new OrderError('No items in order');
  }
  if (!shippingAddress?.mobile) {
    throw new OrderError('Mobile number required for delivery');
  }

  const { orderItems, subtotalAmount } = await buildOrderItemsAndSubtotal(items);
  const totals = calculateTotals(subtotalAmount);

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotalAmount: totals.subtotalAmount,
    shippingAmount: totals.shippingAmount,
    discountAmount: totals.discountAmount,
    couponCode: totals.couponCode,
    totalAmount: totals.totalAmount,
    notes,
    paymentMethod,
    paymentDetails
  });

  return order;
}

module.exports = {
  OrderError,
  createOrderForUser,
  quoteOrderForUser
};

