const { body } = require('express-validator');

const createModuleValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),

    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer'),

    body('description').optional().trim(),

    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];

const updateModuleValidator = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),

    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer'),

    body('description').optional().trim(),

    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
];

module.exports = { createModuleValidator, updateModuleValidator };
