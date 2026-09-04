const express = require('express');

const router = express.Router();

const {
    ListCourses,
    ListCoursesAdmin,
    GetCourse,
    GetCourseByIdAdmin,
    CreateCourse,
    UpdateCourse,
    DeleteCourse,
} = require('../controllers/course.controller');

const {
    createCourseValidator,
    updateCourseValidator,
} = require('../validators/course.validator');

const validate = require('../middlewares/validate');
const { protect, authorize, optionalAuth } = require('../middlewares/auth.middleware');


// PUBLIC: list published courses
router.get('/', ListCourses);

// ADMIN: list all courses (draft + published)
router.get('/admin/all', protect, authorize('admin'), ListCoursesAdmin);

// ADMIN: get a course by id (for editing)
router.get('/admin/:id', protect, authorize('admin'), GetCourseByIdAdmin);

// PUBLIC/AUTH: get a course by slug (admins see drafts too)
router.get('/:slug', optionalAuth, GetCourse);

// ADMIN: create course
router.post('/', protect, authorize('admin'), createCourseValidator, validate, CreateCourse);

// ADMIN: update course
router.put('/:id', protect, authorize('admin'), updateCourseValidator, validate, UpdateCourse);

// ADMIN: delete course
router.delete('/:id', protect, authorize('admin'), DeleteCourse);


module.exports = router;
