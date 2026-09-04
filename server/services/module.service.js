const Module = require("../models/modules.model");
const Lesson = require("../models/lesson.model");
const Course = require("../models/courses.model");

const getModuleById = async (id) => {
    const module = await Module.findById(id).populate({
        path: "lessons",
        options: { sort: { order: 1 } },
    });
    if (!module) {
        throw new Error("Module not found");
    }
    return module;
};

const createModule = async (courseId, data) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    let order = data.order;
    if (order === undefined) {
        const lastModule = await Module.findOne({ course: courseId }).sort({ order: -1 });
        order = lastModule ? lastModule.order + 1 : 0;
    }

    const module = await Module.create({ ...data, order, course: courseId });

    course.modules.push(module._id);
    course.totalModules = course.modules.length;
    await course.save();

    return module;
};

const updateModule = async (id, data) => {
    const module = await Module.findById(id);
    if (!module) {
        throw new Error("Module not found");
    }
    Object.assign(module, data);
    await module.save();
    return module;
};

const deleteModule = async (id) => {
    const module = await Module.findById(id);
    if (!module) {
        throw new Error("Module not found");
    }

    const lessonCount = await Lesson.countDocuments({ module: id });
    await Lesson.deleteMany({ module: id });
    await module.deleteOne();

    const course = await Course.findById(module.course);
    if (course) {
        course.modules = course.modules.filter((m) => m.toString() !== id);
        course.totalModules = course.modules.length;
        course.totalLessons = Math.max(0, course.totalLessons - lessonCount);
        await course.save();
    }

    return { success: true, message: "Module deleted successfully" };
};

module.exports = { getModuleById, createModule, updateModule, deleteModule };
