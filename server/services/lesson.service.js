const Lesson = require("../models/lesson.model");
const Module = require("../models/modules.model");
const Course = require("../models/courses.model");
const Enrollment = require("../models/enrollment.model");

const getLessonById = async (id, user) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new Error("Lesson not found");
    }

    if (user && user.role !== "admin") {
        const module = await Module.findById(lesson.module);
        const enrolled = module
            ? await Enrollment.exists({ user: user._id, course: module.course })
            : null;
        if (!enrolled) {
            const err = new Error("Enroll in this course to access the lesson");
            err.code = "NOT_ENROLLED";
            throw err;
        }
    }

    return lesson;
};

const createLesson = async (moduleId, data) => {
    const module = await Module.findById(moduleId);
    if (!module) {
        throw new Error("Module not found");
    }

    let order = data.order;
    if (order === undefined) {
        const lastLesson = await Lesson.findOne({ module: moduleId }).sort({ order: -1 });
        order = lastLesson ? lastLesson.order + 1 : 0;
    }

    const lesson = await Lesson.create({ ...data, order, module: moduleId });

    module.lessons.push(lesson._id);
    await module.save();

    const course = await Course.findById(module.course);
    if (course) {
        course.totalLessons += 1;
        await course.save();
    }

    return lesson;
};

const updateLesson = async (id, data) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new Error("Lesson not found");
    }
    Object.assign(lesson, data);
    await lesson.save();
    return lesson;
};

const deleteLesson = async (id) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new Error("Lesson not found");
    }

    const module = await Module.findById(lesson.module);
    await lesson.deleteOne();

    if (module) {
        module.lessons = module.lessons.filter((l) => l.toString() !== id);
        await module.save();

        const course = await Course.findById(module.course);
        if (course) {
            course.totalLessons = Math.max(0, course.totalLessons - 1);
            await course.save();
        }
    }

    return { success: true, message: "Lesson deleted successfully" };
};

module.exports = { getLessonById, createLesson, updateLesson, deleteLesson };
