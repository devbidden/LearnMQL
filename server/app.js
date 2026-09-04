const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

// Bachs webhook needs the raw body for signature verification — mount before express.json
const { Webhook } = require('./controllers/payment.controller');
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), Webhook);

app.use(express.json());
app.use(cookieParser());

// routes
const authRoutes = require('./routers/authRoute');
const courseRoutes = require('./routers/courseRoute');
const moduleRoutes = require('./routers/moduleRoute');
const lessonRoutes = require('./routers/lessonRoute');
const enrollmentRoutes = require('./routers/enrollmentRoute');
const progressRoutes = require('./routers/progressRoute');
const paymentRoutes = require('./routers/paymentRoute');
const uploadRoutes = require('./routers/uploadRoute');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/uploads', uploadRoutes);

// fallback error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

module.exports = app;