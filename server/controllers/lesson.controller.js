const {
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
} = require("../services/lesson.service");

const GetLesson = async (req, res) => {
    try {
        const lesson = await getLessonById(req.params.id, req.user);
        res.status(200).json({ success: true, lesson });
    } catch (error) {
        const statusCode = error.code === "NOT_ENROLLED" ? 403 : 404;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

const CreateLesson = async (req, res) => {
    try {
        const lesson = await createLesson(req.params.moduleId, req.body);
        res.status(201).json({ success: true, lesson });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const UpdateLesson = async (req, res) => {
    try {
        const lesson = await updateLesson(req.params.id, req.body);
        res.status(200).json({ success: true, lesson });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const DeleteLesson = async (req, res) => {
    try {
        const result = await deleteLesson(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = { GetLesson, CreateLesson, UpdateLesson, DeleteLesson };
