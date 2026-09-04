const express = require('express');

const router = express.Router();

const {
    GetModule,
    CreateModule,
    UpdateModule,
    DeleteModule,
} = require('../controllers/module.controller');

const {
    createModuleValidator,
    updateModuleValidator,
} = require('../validators/module.validator');

const validate = require('../middlewares/validate');
const { protect, authorize } = require('../middlewares/auth.middleware');


// AUTH: get a module with its lessons
router.get('/:id', protect, GetModule);

// ADMIN: create module under a course
router.post(
    '/course/:courseId',
    protect,
    authorize('admin'),
    createModuleValidator,
    validate,
    CreateModule
);

// ADMIN: update module
router.put('/:id', protect, authorize('admin'), updateModuleValidator, validate, UpdateModule);

// ADMIN: delete module
router.delete('/:id', protect, authorize('admin'), DeleteModule);


module.exports = router;
