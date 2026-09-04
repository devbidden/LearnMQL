const Payment = require("../models/payment.model");
const Course = require("../models/courses.model");
const Enrollment = require("../models/enrollment.model");
const bachs = require("../config/bachs");
const { enrollInCourse } = require("./enrollment.service");

const getCurrency = () => process.env.BACHS_CURRENCY || process.env.PAYSTACK_CURRENCY || "USD";

const frontendUrl = () => process.env.FRONTEND_URL || "http://localhost:5173";

const populateEnrollment = (enrollment) =>
    Enrollment.findById(enrollment._id).populate("course");

const initializePayment = async (user, courseId) => {
    const course = await Course.findById(courseId);
    if (!course || course.status !== "published") {
        throw new Error("Course not found");
    }

    const existing = await Enrollment.findOne({ user: user._id, course: courseId });
    if (existing) {
        const err = new Error("You already own this course");
        err.code = "ALREADY_ENROLLED";
        throw err;
    }

    if (!course.price || course.price <= 0) {
        const enrollment = await enrollInCourse(user._id, courseId, { skipPaymentCheck: true });
        return { free: true, enrollment };
    }

    const reference = `LMQL-${courseId.toString().slice(-6)}-${user._id
        .toString()
        .slice(-6)}-${Date.now()}`;

    const payment = await Payment.create({
        reference,
        user: user._id,
        course: courseId,
        amount: Math.round(course.price * 100),
        currency: getCurrency(),
    });

    const session = await bachs.initializeTransaction({
        email: user.email,
        name: user.name,
        amount: payment.amount,
        currency: payment.currency,
        reference: payment.reference,
        successUrl: `${frontendUrl()}/payment/callback`,
        cancelUrl: `${frontendUrl()}/courses`,
        metadata: {
            userId: user._id.toString(),
            courseId: courseId.toString(),
            courseTitle: course.title,
            reference: payment.reference,
        },
    });

    const checkoutUrl = session.checkout_url;
    if (!checkoutUrl) {
        throw new Error("Bachs did not return a checkout URL");
    }

    payment.checkoutId = session.checkout_id;
    payment.gatewayResponse = session;
    await payment.save();

    return {
        free: false,
        authorizationUrl: checkoutUrl,
        reference: payment.reference,
        checkoutId: session.checkout_id,
    };
};

const markPaidAndEnroll = async (payment, session) => {
    payment.status = "success";
    payment.paidAt = new Date();
    payment.channel = session.payment_method || session.charge?.payment_method || payment.channel;
    payment.gatewayResponse = session;
    if (session.checkout_id) payment.checkoutId = session.checkout_id;
    await payment.save();

    let enrollment;
    try {
        enrollment = await enrollInCourse(payment.user, payment.course, { skipPaymentCheck: true });
    } catch (error) {
        enrollment = await Enrollment.findOne({
            user: payment.user,
            course: payment.course,
        });
    }

    if (enrollment) {
        enrollment = await populateEnrollment(enrollment);
    }

    return { payment, enrollment, alreadyProcessed: false };
};

const sessionSucceeded = (session) =>
    session.status === "completed" ||
    session.payment_status === "succeeded" ||
    session.charge?.status === "succeeded";

const verifyPayment = async (id) => {
    const payment = await Payment.findOne({
        $or: [{ reference: id }, { checkoutId: id }],
    });
    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.status === "success") {
        const enrollment = await Enrollment.findOne({
            user: payment.user,
            course: payment.course,
        }).populate("course");
        return { payment, enrollment, alreadyProcessed: true };
    }

    const checkoutId = payment.checkoutId || (String(id).startsWith("chk_") ? id : null);
    if (!checkoutId) {
        throw new Error("Payment checkout session is missing. Start checkout again.");
    }

    const session = await bachs.getCheckoutSession(checkoutId);

    if (sessionSucceeded(session)) {
        const paidAmount = session.amount != null ? Math.round(Number(session.amount) * 100) : payment.amount;
        if (paidAmount < payment.amount) {
            const err = new Error("Payment amount did not match this course");
            err.code = "PAYMENT_NOT_SUCCESSFUL";
            throw err;
        }
        return markPaidAndEnroll(payment, session);
    }

    if (session.status === "expired" || session.payment_status === "canceled" || session.payment_status === "failed") {
        payment.status = session.payment_status === "failed" ? "failed" : "abandoned";
        payment.gatewayResponse = session;
        await payment.save();
    }

    const err = new Error("Payment was not successful");
    err.code = "PAYMENT_NOT_SUCCESSFUL";
    throw err;
};

const fulfillFromWebhook = async (event) => {
    const checkoutId = event.data?.checkout_id;
    const reference = event.data?.reference || event.data?.metadata?.reference;
    const id = checkoutId || reference;
    if (!id) return null;
    return verifyPayment(id);
};

module.exports = { initializePayment, verifyPayment, fulfillFromWebhook };
