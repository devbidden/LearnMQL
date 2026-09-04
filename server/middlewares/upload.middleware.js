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

module.exports = { videoUpload };
