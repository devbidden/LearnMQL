const { body } = require('express-validator');

const createCourseValidator = [
    body('title').trim().notEmpty().withMessage('Title is required'),

    body('slug')
        .trim()
        .notEmpty()
        .withMessage('Slug is required')
        .isSlug()
        .withMessage('Slug must be URL-friendly (lowercase, hyphens only)'),

    body('description').trim().notEmpty().withMessage('Description is required'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('level')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Level must be beginner, intermediate or advanced'),

    body('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage('Status must be draft or published'),

    body('featured').optional().isBoolean().withMessage('featured must be a boolean'),
    body('category').optional().trim(),
    body('duration').optional().trim(),
    body('thumbnail').optional().trim(),
];

const updateCourseValidator = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),

    body('slug')
        .optional()
        .trim()
        .isSlug()
        .withMessage('Slug must be URL-friendly (lowercase, hyphens only)'),

    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('level')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Level must be beginner, intermediate or advanced'),

    body('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage('Status must be draft or published'),

    body('featured').optional().isBoolean().withMessage('featured must be a boolean'),
    body('category').optional().trim(),
    body('duration').optional().trim(),
    body('thumbnail').optional().trim(),
];

module.exports = { createCourseValidator, updateCourseValidator };
