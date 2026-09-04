const express = require('express');

const router = express.Router();

const {
    Register,
    Login,
    Logout,
    GetMe,
    ForgotPassword,
    ResetPassword,
    VerifyEmail,
    ResendVerification,
    ListUsersAdmin
} = require('../controllers/auth.controller');

const {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    resendVerificationValidator
} = require('../validators/auth.validator');

const validate = require('../middlewares/validate');
const { protect, authorize } = require('../middlewares/auth.middleware');


// REGISTER
router.post(
    '/register',
    registerValidator,
    validate,
    Register
);


// LOGIN
router.post(
    '/login',
    loginValidator,
    validate,
    Login
);


// LOGOUT
router.post('/logout', Logout);


// CURRENT USER
router.get('/me', protect, GetMe);


// FORGOT PASSWORD
router.post(
    '/forgot-password',
    forgotPasswordValidator,
    validate,
    ForgotPassword
);


// RESET PASSWORD
router.post(
    '/reset-password/:token',
    resetPasswordValidator,
    validate,
    ResetPassword
);


// VERIFY EMAIL
router.post('/verify-email/:token', VerifyEmail);


// RESEND VERIFICATION EMAIL
router.post(
    '/resend-verification',
    resendVerificationValidator,
    validate,
    ResendVerification
);


// ADMIN: LIST USERS
router.get('/users', protect, authorize('admin'), ListUsersAdmin);


module.exports = router;