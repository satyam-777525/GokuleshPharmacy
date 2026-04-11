const express = require('express');
const { MetaInfo, StandardCheckoutPayRequest } = require('pg-sdk-node');
const { protect } = require('../middleware/auth');
const { createOrderForUser, quoteOrderForUser, OrderError } = require('../services/orderService');
const { getPhonePeClient, ensurePhonePeConfigured, normalizeClientBaseUrl } = require('../config/phonepeClient');

const router = express.Router();

// Browsers use GET when you open a URL in the tab; this route only supports POST from the app.
router.get('/phonepe/order', (req, res) => {
  res.status(405).set('Allow', 'POST').json({
    message:
      'This URL is an API endpoint (POST only). Use Checkout → Online Payment in the website, or call POST /api/payments/phonepe/order with Authorization: Bearer <token> and JSON body { "items": [...] }.',
    error: 'METHOD_NOT_ALLOWED'
  });
});

router.get('/phonepe/confirm', (req, res) => {
  res.status(405).set('Allow', 'POST').json({
    message:
      'Confirm payment is POST only. After paying on PhonePe you are sent to the site at /payment/phonepe/result, which calls this API automatically.',
    error: 'METHOD_NOT_ALLOWED'
  });
});

/** Map PhonePe SDK errors to a helpful API message (many show only "Bad Request"). */
function formatPhonePePayError(err, redirectUrl) {
  const code = err.code || err.data?.errorCode;
  const detail = code ? ` [${code}]` : '';
  const envHint =
    process.env.PHONEPE_ENV === 'PROD'
      ? 'Use production Client ID/Secret from PhonePe. '
      : 'Use sandbox credentials and PHONEPE_ENV=SANDBOX (or unset). ';

  if (err.httpStatusCode === 401 || err.type === 'UnauthorizedAccess') {
    return `PhonePe login failed${detail}. Check PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET. ${envHint}They must be from the same PhonePe mode (sandbox vs production).`;
  }

  if (err.httpStatusCode === 400 || err.type === 'BadRequest') {
    const fromApi = err.message && err.message !== 'Bad Request' ? err.message : '';
    if (fromApi) return `${fromApi}${detail}`;
    return (
      `PhonePe rejected the payment request${detail}. Usually: (1) PHONEPE_ENV must match your keys — test/sandbox keys need SANDBOX, live keys need PROD; ` +
      `(2) register this exact redirect URL in the PhonePe dashboard: ${redirectUrl}; ` +
      `(3) production sites should use HTTPS in CLIENT_URL.`
    );
  }

  return (err.message || 'Payment gateway error') + detail;
}

// @POST /api/payments/phonepe/order
// Creates a PhonePe Standard Checkout order and returns redirect URL
router.post('/phonepe/order', protect, async (req, res) => {
  const baseUrl = normalizeClientBaseUrl(process.env.CLIENT_URL);
  const redirectUrl = `${baseUrl}/payment/phonepe/result`;

  try {
    // If gateway isn't configured, return a friendly message (don't confuse user with amount errors)
    ensurePhonePeConfigured();

    const { amount, items } = req.body;
    const quoted = Array.isArray(items) && items.length ? await quoteOrderForUser({ items }) : null;
    const finalAmount = quoted ? quoted.totalAmount : amount;

    if (!finalAmount || Number.isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount. Please try again.' });
    }
    const client = getPhonePeClient();

    const merchantOrderId = `ORD_${Date.now()}_${String(req.user._id).slice(-6)}`;
    const metaInfo = MetaInfo.builder()
      .udf1(String(req.user._id))
      .build();

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(Math.round(Number(finalAmount) * 100)) // amount in paisa
      .redirectUrl(redirectUrl)
      .metaInfo(metaInfo)
      .build();

    const response = await client.pay(request);

    const checkoutUrl = response.redirect_url || response.redirectUrl;
    if (!checkoutUrl) {
      return res.status(502).json({ message: 'Payment gateway returned an invalid response. Please try COD or contact support.' });
    }

    res.json({
      checkoutUrl,
      merchantOrderId,
      amount: Number(finalAmount)
    });
  } catch (err) {
    if (err instanceof OrderError) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
    if (err.message === 'PhonePe gateway not configured') {
      return res.status(503).json({ message: 'Online payment is temporarily unavailable. Please try Cash on Delivery.' });
    }

    const msg = formatPhonePePayError(err, redirectUrl);

    const status =
      typeof err.httpStatusCode === 'number' &&
      err.httpStatusCode >= 400 &&
      err.httpStatusCode < 500
        ? 502
        : 500;
    return res.status(status).json({ message: msg });
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
