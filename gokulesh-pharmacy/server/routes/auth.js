const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @POST /api/auth/register
router.post('/register', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, mobile, password } = req.body;
    if (!email && !mobile) return res.status(400).json({ message: 'Email or mobile required' });

    const existing = email
      ? await User.findOne({ email })
      : await User.findOne({ mobile });

    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, mobile, password });
    const token = signToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password required' });
    if (!email && !mobile) return res.status(400).json({ message: 'Email or mobile required' });

    const user = await User.findOne(email ? { email } : { mobile }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
