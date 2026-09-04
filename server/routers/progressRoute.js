const express = require('express');

const router = express.Router();

const {
    GetCourseProgress,
    UpdateLessonProgress,
} = require('../controllers/progress.controller');

const { updateProgressValidator } = require('../validators/progress.validator');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');


// all progress routes require an authenticated user
router.use(protect);

// get all lesson progress records for a course
router.get('/:courseId', GetCourseProgress);

// update progress for a lesson (expects { moduleId, status, progress, timeSpent, quizScore } in body)
router.patch(
    '/:courseId/lessons/:lessonId',
    updateProgressValidator,
    validate,
    UpdateLessonProgress
);


module.exports = router;
