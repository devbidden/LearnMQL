const { uploadBufferToCloudinary } = require("../utils/cloudinaryUpload");

// POST /api/uploads/video (multipart field "video") -> { url, duration }
const UploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No video file provided" });
        }

        const result = await uploadBufferToCloudinary(req.file.buffer, {
            resource_type: "video",
            folder: "learnmql/lessons",
        });

        res.status(201).json({
            success: true,
            url: result.secure_url,
            durationMinutes: result.duration ? Math.round(result.duration / 60) : undefined,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// POST /api/uploads/course-cover (multipart field "image") -> { url }
const UploadCourseCover = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No cover image provided" });
        }

        const result = await uploadBufferToCloudinary(req.file.buffer, {
            resource_type: "image",
            folder: "learnmql/course-covers",
        });

        res.status(201).json({ success: true, url: result.secure_url });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { UploadVideo, UploadCourseCover };
