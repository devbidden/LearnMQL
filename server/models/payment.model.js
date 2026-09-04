const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        reference: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        checkoutId: {
            type: String,
            index: true,
            sparse: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        amount: {
            type: Number, // in the currency's subunit (kobo/cents)
            required: true,
        },

        currency: {
            type: String,
            default: "NGN",
        },

        status: {
            type: String,
            enum: ["pending", "success", "failed", "abandoned"],
            default: "pending",
        },

        channel: {
            type: String,
        },

        paidAt: {
            type: Date,
        },

        gatewayResponse: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
