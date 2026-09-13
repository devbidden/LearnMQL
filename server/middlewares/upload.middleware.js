const multer = require("multer");

const storage = multer.memoryStorage();

const videoUpload = multer({
    storage,
    limits: { fileSize: 300 * 1024 * 1024 }, // 300MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("video/")) {
            return cb(new Error("Only video files are allowed"));
        }
        cb(null, true);
    },
});

const imageUpload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    },
});

module.exports = { videoUpload, imageUpload };
