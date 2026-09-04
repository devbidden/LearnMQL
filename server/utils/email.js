const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    // 465 uses implicit TLS; 587/25 use STARTTLS, so secure must be false there
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// call once at startup so bad SMTP config fails fast with a clear message
const verifyEmailTransport = async () => {
    try {
        await transporter.verify();
        console.log(`Email transport ready (${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}) as ${process.env.EMAIL_USER}`);
    } catch (error) {
        console.error("Email transport failed to initialize:", error.message);
    }
};

const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    });
};

module.exports = { sendEmail, verifyEmailTransport };