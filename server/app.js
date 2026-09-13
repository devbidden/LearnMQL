const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

const normalizeOrigin = (value) =>
    typeof value === 'string' ? value.trim().replace(/^['"]|['"]$/g, '') : value;

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'https://www.learnmql.com',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Bachs webhook needs the raw body for signature verification — mount before express.json
const { Webhook } = require('./controllers/payment.controller');
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), Webhook);

app.use(express.json());
app.use(cookieParser());

// Safe deployment diagnostic: exposes connection state, never credentials.
app.get('/api/health', (req, res) => {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };
    const readyState = mongoose.connection.readyState;
    const connected = readyState === 1;

    res.status(connected ? 200 : 503).json({
        success: connected,
        service: 'learn-mql-api',
        database: {
            process: process.env.MONGODB_URL ? 'configured' : 'not configured',
            state: states[readyState] || 'unknown',
        },
    });
});


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
