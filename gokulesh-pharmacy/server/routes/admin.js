const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const { upload, useCloudinary } = require('../config/cloudinary.js');


router.use(protect, adminOnly);

// ---- DASHBOARD ----
router.get('/dashboard', async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, recentOrders] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.find().sort('-createdAt').limit(10).populate('user', 'name email mobile')
    ]);
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    res.json({ totalProducts, totalOrders, totalUsers, revenue: revenue[0]?.total || 0, recentOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- PRODUCTS ----
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').sort('-createdAt');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---- CATEGORIES ----
router.get('/categories', async (req, res) => {
  const cats = await Category.find().sort('name');
  res.json(cats);
});

router.post('/categories', async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
});

// ---- ORDERS ----
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt').populate('user', 'name email mobile');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/orders/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ---- USERS ----
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload route for product images (Cloudinary when configured, else local disk)
router.post('/upload', upload.array('images', 5), async (req, res) => {
  const urls = req.files.map((f) => {
    if (useCloudinary && f.path) return f.path;
    return `/uploads/products/${f.filename}`;
  });
  res.json({ urls });
});

module.exports = router;
