const {
    enrollInCourse,
    getUserEnrollments,
    getEnrollment,
    unenroll,
    completeLesson,
} = require("../services/enrollment.service");

const Enroll = async (req, res) => {
    try {
        if (!req.user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email address before enrolling in a course",
                code: "EMAIL_NOT_VERIFIED",
            });
        }
        const enrollment = await enrollInCourse(req.user.id, req.params.courseId);
        res.status(201).json({ success: true, enrollment });
    } catch (error) {
        const statusCode = error.code === "PAYMENT_REQUIRED" ? 402 : 400;
        res.status(statusCode).json({ success: false, message: error.message, code: error.code });
    }
};

const ListMyEnrollments = async (req, res) => {
    try {
        const enrollments = await getUserEnrollments(req.user.id);
        res.status(200).json({ success: true, enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetMyEnrollment = async (req, res) => {
    try {
        const enrollment = await getEnrollment(req.user.id, req.params.courseId);
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const Unenroll = async (req, res) => {
    try {
        const result = await unenroll(req.user.id, req.params.courseId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const CompleteLesson = async (req, res) => {
    try {
        const { moduleId, score } = req.body;
        const enrollment = await completeLesson(
            req.user.id,
            req.params.courseId,
            moduleId,
            req.params.lessonId,
            score
        );
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    Enroll,
    ListMyEnrollments,
    GetMyEnrollment,
    Unenroll,
    CompleteLesson,
};
