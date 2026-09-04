const {
    getCourses,
    getAllCoursesAdmin,
    getCourseBySlug,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require("../services/course.service");

const ListCourses = async (req, res) => {
    try {
        const courses = await getCourses(req.query);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const ListCoursesAdmin = async (req, res) => {
    try {
        const courses = await getAllCoursesAdmin();
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const Enrollment = require("../models/enrollment.model");

// strips paid content (lesson bodies, quizzes, videos) for users who don't own the course
const stripLockedContent = (course) => {
    const data = course.toObject ? course.toObject() : course;
    data.modules = (data.modules || []).map((module) => ({
        ...module,
        lessons: (module.lessons || []).map((lesson) => ({
            _id: lesson._id,
            title: lesson.title,
            summary: lesson.summary,
            duration: lesson.duration,
            order: lesson.order,
            type: lesson.type,
        })),
    }));
    return data;
};

const GetCourse = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const course = await getCourseBySlug(req.params.slug, isAdmin);

        let enrolled = false;
        if (req.user) {
            enrolled = Boolean(
                await Enrollment.exists({ user: req.user._id, course: course._id })
            );
        }

        if (isAdmin || enrolled) {
            return res.status(200).json({ success: true, course, enrolled: true });
        }

        res.status(200).json({ success: true, course: stripLockedContent(course), enrolled: false });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const GetCourseByIdAdmin = async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const CreateCourse = async (req, res) => {
    try {
        const course = await createCourse(req.body);
        res.status(201).json({ success: true, course });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const UpdateCourse = async (req, res) => {
    try {
        const course = await updateCourse(req.params.id, req.body);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const DeleteCourse = async (req, res) => {
    try {
        const result = await deleteCourse(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = {
    ListCourses,
    ListCoursesAdmin,
    GetCourse,
    GetCourseByIdAdmin,
    CreateCourse,
    UpdateCourse,
    DeleteCourse,
};
