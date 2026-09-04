const {
    initializePayment,
    verifyPayment,
    fulfillFromWebhook,
} = require("../services/payment.service");
const { verifyWebhookSignature } = require("../config/bachs");

const InitializePayment = async (req, res) => {
    try {
        if (!req.user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email address before enrolling in a course",
                code: "EMAIL_NOT_VERIFIED",
            });
        }

        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        const result = await initializePayment(req.user, courseId);

        if (result.free) {
            return res.status(200).json({
                success: true,
                free: true,
                enrollment: result.enrollment,
            });
        }

        res.status(200).json({
            success: true,
            free: false,
            authorizationUrl: result.authorizationUrl,
            reference: result.reference,
            checkoutId: result.checkoutId,
        });
    } catch (error) {
        const statusCode = error.code === "ALREADY_ENROLLED" ? 409 : 400;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

const VerifyPayment = async (req, res) => {
    try {
        const { payment, enrollment, alreadyProcessed } = await verifyPayment(
            req.params.reference
        );

        res.status(200).json({
            success: true,
            alreadyProcessed,
            payment: {
                reference: payment.reference,
                checkoutId: payment.checkoutId,
                status: payment.status,
                amount: payment.amount,
                currency: payment.currency,
                paidAt: payment.paidAt,
            },
            enrollment,
        });
    } catch (error) {
        const statusCode = error.message === "Payment not found" ? 404 : 402;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

const Webhook = async (req, res) => {
    try {
        const rawBody = req.body instanceof Buffer ? req.body.toString() : JSON.stringify(req.body);
        const timestamp = req.headers["x-bachs-timestamp"];
        const signature = req.headers["x-bachs-signature"];
        const secret = process.env.BACHS_WEBHOOK_SECRET;

        if (secret && !verifyWebhookSignature(rawBody, timestamp, signature, secret)) {
            return res.status(401).json({ success: false, message: "Invalid signature" });
        }

        const event = JSON.parse(rawBody);
        const type = event.type || event.event;

        if (type === "collection.succeeded" || type === "checkout.completed") {
            await fulfillFromWebhook(event).catch(() => null);
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { InitializePayment, VerifyPayment, Webhook };
