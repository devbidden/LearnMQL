const LessonProgress = require("../models/lessonProgress.model");
const Enrollment = require("../models/enrollment.model");

const getCourseProgress = async (userId, courseId) => {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }
    return LessonProgress.find({ user: userId, course: courseId }).sort({ updatedAt: -1 });
};

const updateLessonProgress = async (userId, courseId, moduleId, lessonId, data) => {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }

    const update = { ...data };
    if (update.status === "completed" && !update.completedAt) {
        update.completedAt = new Date();
    }

    const progress = await LessonProgress.findOneAndUpdate(
        { user: userId, course: courseId, module: moduleId, lesson: lessonId },
        { ...update, $inc: { attempts: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return progress;
};

module.exports = { getCourseProgress, updateLessonProgress };
