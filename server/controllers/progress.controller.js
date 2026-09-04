const {
    getCourseProgress,
    updateLessonProgress,
} = require("../services/progress.service");

const GetCourseProgress = async (req, res) => {
    try {
        const progress = await getCourseProgress(req.user.id, req.params.courseId);
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const UpdateLessonProgress = async (req, res) => {
    try {
        const { moduleId } = req.body;
        const progress = await updateLessonProgress(
            req.user.id,
            req.params.courseId,
            moduleId,
            req.params.lessonId,
            req.body
        );
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { GetCourseProgress, UpdateLessonProgress };
