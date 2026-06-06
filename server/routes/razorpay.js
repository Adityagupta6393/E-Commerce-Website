const razorpayController = require('../controller/razorpay.js');
const express = require('express');
const router = express.Router();

router.post('/create-order', razorpayController.createOrder);
router.post('/verify-payment', razorpayController.verifyPayment);

module.exports = router;