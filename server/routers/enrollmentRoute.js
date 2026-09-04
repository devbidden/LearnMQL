const express = require('express');

const router = express.Router();

const {
    Enroll,
    ListMyEnrollments,
    GetMyEnrollment,
    Unenroll,
    CompleteLesson,
} = require('../controllers/enrollment.controller');

const { protect } = require('../middlewares/auth.middleware');


// all enrollment routes require an authenticated user
router.use(protect);

// list the current user's enrollments
router.get('/', ListMyEnrollments);

// enroll in a course
router.post('/:courseId', Enroll);

// get a single enrollment (with progress)
router.get('/:courseId', GetMyEnrollment);

// unenroll from a course
router.delete('/:courseId', Unenroll);

// mark a lesson complete (expects { moduleId } in body)
router.patch('/:courseId/lessons/:lessonId/complete', CompleteLesson);


module.exports = router;
