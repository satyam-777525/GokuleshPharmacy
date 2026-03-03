const express = require('express');
const { MetaInfo, StandardCheckoutPayRequest } = require('pg-sdk-node');
const { protect } = require('../middleware/auth');
const { createOrderForUser, OrderError } = require('../services/orderService');
const { getPhonePeClient, ensurePhonePeConfigured } = require('../config/phonepeClient');

const router = express.Router();

// @POST /api/payments/phonepe/order
// Creates a PhonePe Standard Checkout order and returns redirect URL
router.post('/phonepe/order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }

    ensurePhonePeConfigured();
    const client = getPhonePeClient();

    const merchantOrderId = `ORD_${Date.now()}_${String(req.user._id).slice(-6)}`;
    const redirectUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/phonepe/result`;
    const metaInfo = MetaInfo.builder()
      .udf1(String(req.user._id))
      .build();

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(Math.round(amount * 100)) // amount in paisa
      .redirectUrl(redirectUrl)
      .metaInfo(metaInfo)
      .build();

    const response = await client.pay(request);

    res.json({
      checkoutUrl: response.redirect_url || response.redirectUrl,
      merchantOrderId
    });
  } catch (err) {
    if (err.message === 'PhonePe gateway not configured') {
      return res.status(503).json({ message: 'Online payment is temporarily unavailable. Please try Cash on Delivery.' });
    }
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/payments/phonepe/confirm
// Confirms PhonePe payment and creates order if completed
router.post('/phonepe/confirm', protect, async (req, res) => {
  try {
    const { merchantOrderId, items, shippingAddress, notes } = req.body;
    if (!merchantOrderId) {
      return res.status(400).json({ message: 'Missing merchantOrderId' });
    }

    ensurePhonePeConfigured();
    const client = getPhonePeClient();
    const status = await client.getOrderStatus(merchantOrderId);

    if (!status || status.state !== 'COMPLETED') {
      return res.status(400).json({ message: 'Payment not completed yet', state: status?.state || 'UNKNOWN' });
    }

    const paymentDetailsList = status.paymentDetails || status.payment_details || [];
    const paymentDetails = Array.isArray(paymentDetailsList) && paymentDetailsList.length
      ? paymentDetailsList[0]
      : null;

    const order = await createOrderForUser({
      userId: req.user._id,
      items,
      shippingAddress,
      notes,
      paymentMethod: 'PhonePe',
      paymentDetails: {
        provider: 'phonepe',
        merchantOrderId,
        orderId: status.orderId || status.order_id,
        transactionId: paymentDetails?.transactionId,
        paymentMode: paymentDetails?.paymentMode
      }
    });

    res.status(201).json(order);
  } catch (err) {
    if (err instanceof OrderError) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
    if (err.message === 'PhonePe gateway not configured') {
      return res.status(503).json({ message: 'Online payment is temporarily unavailable. Please try Cash on Delivery.' });
    }
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
