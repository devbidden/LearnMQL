const express = require('express');

const router = express.Router();

const {
    GetLesson,
    CreateLesson,
    UpdateLesson,
    DeleteLesson,
} = require('../controllers/lesson.controller');

const {
    createLessonValidator,
    updateLessonValidator,
} = require('../validators/lesson.validator');

const validate = require('../middlewares/validate');
const { protect, authorize } = require('../middlewares/auth.middleware');


// AUTH: get a single lesson
router.get('/:id', protect, GetLesson);

// ADMIN: create lesson under a module
router.post(
    '/module/:moduleId',
    protect,
    authorize('admin'),
    createLessonValidator,
    validate,
    CreateLesson
);

// ADMIN: update lesson
router.put('/:id', protect, authorize('admin'), updateLessonValidator, validate, UpdateLesson);

// ADMIN: delete lesson
router.delete('/:id', protect, authorize('admin'), DeleteLesson);


module.exports = router;
