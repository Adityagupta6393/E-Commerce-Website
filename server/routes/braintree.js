const express = require('express');
const router = express.Router();
const braintreeController = require('../controller/braintree');

router.post("/braintree/get-token", brainTreeController.ganerateToken);
router.post("/braintree/payment", brainTreeController.paymentProcess);

module.exports = router;