const ContactMessage = require('../models/contactMessage.model');
const { sendEmail } = require('../utils/email');

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const submitContactMessage = async (req, res) => {
    try {
        const message = await ContactMessage.create(req.body);
        const recipient = process.env.CONTACT_RECIPIENT || process.env.EMAIL_FROM || process.env.EMAIL_USER;

        if (!recipient) {
            throw new Error('Contact email recipient is not configured');
        }

        try {
            await sendEmail({
                to: recipient,
                replyTo: message.email,
                subject: `New learnmql contact message from ${message.name}`,
                html: `
                    <h2>New contact message</h2>
                    <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
                    <p><strong>Message:</strong></p>
                    <p>${escapeHtml(message.message).replace(/\n/g, '<br>')}</p>
                `,
            });
        } catch (emailError) {
            console.error('Contact notification email failed:', emailError.message);
        }

        res.status(201).json({ success: true, message: 'Thanks — your message has been sent.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Could not send your message.' });
    }
};

const listContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { submitContactMessage, listContactMessages };
