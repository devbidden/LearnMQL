const { body } = require('express-validator');

const contactValidator = [
    body('name').trim().isLength({ min: 2, max: 120 }).withMessage('Please enter your name.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email address.'),
    body('message').trim().isLength({ min: 10, max: 5000 }).withMessage('Your message must be between 10 and 5000 characters.'),
];

module.exports = { contactValidator };
