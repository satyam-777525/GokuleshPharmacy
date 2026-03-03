const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const { createOrderForUser, OrderError } = require('../services/orderService');

// @POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, notes, paymentMethod, paymentDetails } = req.body;
    const order = await createOrderForUser({
      userId: req.user._id,
      items,
      shippingAddress,
      notes,
      paymentMethod: paymentMethod || 'COD',
      paymentDetails
    });
    res.status(201).json(order);
  } catch (err) {
    if (err instanceof OrderError) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/my-orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
