const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

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

// Safe deployment diagnostic: attempts a connection but never exposes credentials.
app.get('/api/health', async (req, res) => {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };
    try {
        await connectDB();
    } catch (error) {
        return res.status(503).json({
            success: false,
            service: 'learn-mql-apiss',
            database: {
                connected: false,
                state: states[mongoose.connection.readyState] || 'unknown',
                error: error.message,
            },
        });
    }

    const readyState = mongoose.connection.readyState;

    res.status(200).json({
        success: true,
        service: 'learn-mql-api',
        database: {
            connected: true,
            state: states[readyState] || 'unknown',
        },
    });
});

// Vercel functions can restart at any time; connect per invocation and reuse
// the connection while the function instance is warm.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Database connection is unavailable. Please try again shortly.',
        });
    }
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
