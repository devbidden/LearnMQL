const Course = require("../models/courses.model");
const Module = require("../models/modules.model");
const Lesson = require("../models/lesson.model");
const Enrollment = require("../models/enrollment.model");
const LessonProgress = require("../models/lessonProgress.model");

const getCourses = async (filters = {}) => {
    const query = { status: "published" };

    if (filters.category) query.category = filters.category;
    if (filters.level) query.level = filters.level;
    if (filters.featured !== undefined) query.featured = filters.featured === "true";

    return Course.find(query).sort({ createdAt: -1 });
};

const getAllCoursesAdmin = async () => {
    return Course.find().sort({ createdAt: -1 });
};

const getCourseBySlug = async (slug, isAdmin = false) => {
    const course = await Course.findOne({ slug }).populate({
        path: "modules",
        match: isAdmin ? {} : { isPublished: true },
        options: { sort: { order: 1 } },
        populate: {
            path: "lessons",
            match: isAdmin ? {} : { isPublished: true },
            options: { sort: { order: 1 } },
        },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    if (!isAdmin && course.status !== "published") {
        throw new Error("Course not found");
    }

    return course;
};

const getCourseById = async (id) => {
    const course = await Course.findById(id).populate({
        path: "modules",
        options: { sort: { order: 1 } },
        populate: {
            path: "lessons",
            options: { sort: { order: 1 } },
        },
    });
    if (!course) {
        throw new Error("Course not found");
    }
    return course;
};

const createCourse = async (data) => {
    const existing = await Course.findOne({ slug: data.slug });
    if (existing) {
        throw new Error("A course with this slug already exists");
    }
    return Course.create(data);
};

const updateCourse = async (id, data) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error("Course not found");
    }

    if (data.slug && data.slug !== course.slug) {
        const existing = await Course.findOne({ slug: data.slug });
        if (existing) {
            throw new Error("A course with this slug already exists");
        }
    }

    Object.assign(course, data);
    await course.save();
    return course;
};

const deleteCourse = async (id) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error("Course not found");
    }

    const modules = await Module.find({ course: id });
    const moduleIds = modules.map((m) => m._id);

    await Lesson.deleteMany({ module: { $in: moduleIds } });
    await Module.deleteMany({ course: id });
    await Enrollment.deleteMany({ course: id });
    await LessonProgress.deleteMany({ course: id });
    await course.deleteOne();

    return { success: true, message: "Course deleted successfully" };
};

module.exports = {
    getCourses,
    getAllCoursesAdmin,
    getCourseBySlug,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
