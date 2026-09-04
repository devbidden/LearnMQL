const express = require('express');

const router = express.Router();

const {
    InitializePayment,
    VerifyPayment,
} = require('../controllers/payment.controller');

const { protect } = require('../middlewares/auth.middleware');

// AUTH: start a checkout for a course -> { authorizationUrl, reference }
router.post('/initialize', protect, InitializePayment);

// AUTH: confirm a transaction after Paystack redirects back
router.get('/verify/:reference', protect, VerifyPayment);

module.exports = router;
