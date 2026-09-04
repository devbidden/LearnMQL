const express = require('express');

const router = express.Router();

const { UploadVideo } = require('../controllers/upload.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { videoUpload } = require('../middlewares/upload.middleware');

// wraps multer so file-size/type errors come back as 400s instead of falling through to the 500 handler
const handleVideoUpload = (req, res, next) => {
    videoUpload.single('video')(req, res, (error) => {
        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
        next();
    });
};

// ADMIN: upload a lesson video file, returns a Cloudinary URL to store on the lesson
router.post('/video', protect, authorize('admin'), handleVideoUpload, UploadVideo);

module.exports = router;
