const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
} = require('../services/auth.service');
const User = require('../models/user.model');

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
});

const Register = async (req, res) => {
    try {
        const { user, token } = await registerUser(req.body);
        res.cookie('token', token, cookieOptions);
        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email before enrolling in a course.',
            user: sanitizeUser(user),
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body.email, req.body.password);
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: sanitizeUser(user),
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

const Logout = async (req, res) => {
    try {
        await logoutUser();
        res.clearCookie('token', cookieOptions);
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetMe = async (req, res) => {
    res.status(200).json({ success: true, user: sanitizeUser(req.user) });
};

const ForgotPassword = async (req, res) => {
    try {
        const result = await forgotPassword(req.body.email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const ResetPassword = async (req, res) => {
    try {
        const result = await resetPassword(req.params.token, req.body.password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const VerifyEmail = async (req, res) => {
    try {
        const { user, token } = await verifyEmail(req.params.token);
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: sanitizeUser(user),
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const ResendVerification = async (req, res) => {
    try {
        const result = await resendVerificationEmail(req.body.email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const ListUsersAdmin = async (req, res) => {
    try {
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            User.find().select('-password').sort({ date: -1 }).skip(skip).limit(limit),
            User.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    Register,
    Login,
    Logout,
    GetMe,
    ForgotPassword,
    ResetPassword,
    VerifyEmail,
    ResendVerification,
    ListUsersAdmin,
};
