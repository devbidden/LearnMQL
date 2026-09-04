const crypto = require("crypto");

const LIVE_BASE_URL = "https://api.bachs.io";
const SANDBOX_BASE_URL = "https://sandbox-api.bachs.io";

const PLACEHOLDER_KEYS = new Set([
    "",
    "your_paystack_api_key_here",
    "your_paystack_secret_key_here",
]);

const getSecretKey = () => {
    const raw =
        process.env.BACHS_API_KEY ||
        process.env.PAYSTACK_API_KEY ||
        process.env.PAYSTACK_SECRET_KEY ||
        "";
    return String(raw).trim().replace(/^['"]|['"]$/g, "");
};

const getBaseUrl = () => {
    if (process.env.BACHS_API_URL) return process.env.BACHS_API_URL.replace(/\/$/, "");
    const key = getSecretKey();
    return key.startsWith("sk_sandbox_") ? SANDBOX_BASE_URL : LIVE_BASE_URL;
};

const assertSecretKey = () => {
    const key = getSecretKey();

    if (
        !key ||
        PLACEHOLDER_KEYS.has(key.toLowerCase()) ||
        /replace_with|your_paystack|xxx+|changeme/i.test(key)
    ) {
        throw new Error(
            "Payment API key is not configured. Set BACHS_API_KEY (or PAYSTACK_API_KEY) in server/.env to the key from your Bachs dashboard."
        );
    }

    return key;
};

const request = async (path, { method = "GET", body } = {}) => {
    const secretKey = assertSecretKey();

    const res = await fetch(`${getBaseUrl()}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "LearnMQL/1.0",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message =
            data.detail ||
            data.message ||
            (Array.isArray(data.detail) ? JSON.stringify(data.detail) : null) ||
            `Bachs request failed (${res.status})`;
        throw new Error(message);
    }

    return data.data ?? data;
};

const toDecimalAmount = (amountInSubunits) => (Number(amountInSubunits) / 100).toFixed(2);

const isPublicHttpUrl = (url) => {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) return false;
        const host = parsed.hostname.toLowerCase();
        return host !== "localhost" && host !== "127.0.0.1" && host !== "::1";
    } catch {
        return false;
    }
};

const initializeTransaction = ({
    email,
    name,
    amount,
    currency,
    reference,
    successUrl,
    cancelUrl,
    metadata,
}) => {
    const body = {
        customer: {
            email,
            name: name || email,
        },
        pricing: {
            currency,
            amount: toDecimalAmount(amount),
            price_type: "fixed",
        },
        reference,
        metadata,
    };

    if (isPublicHttpUrl(successUrl)) body.success_url = successUrl;
    if (isPublicHttpUrl(cancelUrl)) body.cancel_url = cancelUrl;

    return request("/v1/checkout-sessions", {
        method: "POST",
        body,
    });
};

const getCheckoutSession = (checkoutId) =>
    request(`/v1/checkout-sessions/${encodeURIComponent(checkoutId)}`);

const verifyWebhookSignature = (rawBody, timestamp, signature, secret) => {
    if (!secret || !timestamp || !signature) return false;
    const payload = `${timestamp}.${rawBody}`;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(String(signature));
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
};

module.exports = {
    getSecretKey,
    assertSecretKey,
    initializeTransaction,
    getCheckoutSession,
    verifyWebhookSignature,
    toDecimalAmount,
};
