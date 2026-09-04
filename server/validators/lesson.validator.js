const { body } = require('express-validator');

const createLessonValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),

    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer'),

    body('type')
        .optional()
        .isIn(['video', 'article', 'code', 'quiz', 'exercise'])
        .withMessage('Invalid lesson type'),

    body('duration')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Duration must be a non-negative integer'),

    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
    body('summary').optional().trim(),
    body('description').optional().trim(),
    body('videoUrl').optional().trim(),
    body('code').optional(),
    body('content').optional().isArray(),
    body('quiz').optional(),
];

const updateLessonValidator = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),

    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer'),

    body('type')
        .optional()
        .isIn(['video', 'article', 'code', 'quiz', 'exercise'])
        .withMessage('Invalid lesson type'),

    body('duration')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Duration must be a non-negative integer'),

    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean'),
    body('summary').optional().trim(),
    body('description').optional().trim(),
    body('videoUrl').optional().trim(),
    body('code').optional(),
    body('content').optional().isArray(),
    body('quiz').optional(),
];

module.exports = { createLessonValidator, updateLessonValidator };
