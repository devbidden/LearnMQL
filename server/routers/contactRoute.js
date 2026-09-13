const express = require('express');
const { submitContactMessage, listContactMessages, deleteContactMessage } = require('../controllers/contact.controller');
const { contactValidator } = require('../validators/contact.validator');
const validate = require('../middlewares/validate');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', contactValidator, validate, submitContactMessage);
router.get('/', protect, authorize('admin'), listContactMessages);
router.delete('/:id', protect, authorize('admin'), deleteContactMessage);

module.exports = router;
