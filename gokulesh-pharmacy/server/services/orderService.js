const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'OrderError';
    this.statusCode = statusCode;
  }
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

  let totalAmount = 0;
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
    totalAmount += product.price * item.quantity;
  }

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    totalAmount,
    notes,
    paymentMethod,
    paymentDetails
  });

  return order;
}

module.exports = {
  OrderError,
  createOrderForUser
};

