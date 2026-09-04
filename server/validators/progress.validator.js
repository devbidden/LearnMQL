const { body } = require('express-validator');

const updateProgressValidator = [
    body('status')
        .optional()
        .isIn(['not_started', 'in_progress', 'completed'])
        .withMessage('Invalid status'),

    body('progress')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Progress must be between 0 and 100'),

    body('timeSpent')
        .optional()
        .isInt({ min: 0 })
        .withMessage('timeSpent must be a non-negative integer'),

    body('quizScore')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('quizScore must be between 0 and 100'),
];

module.exports = { updateProgressValidator };
