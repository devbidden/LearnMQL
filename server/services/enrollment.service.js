const Enrollment = require("../models/enrollment.model");
const Course = require("../models/courses.model");
const Module = require("../models/modules.model");
const LessonProgress = require("../models/lessonProgress.model");

const enrollInCourse = async (userId, courseId, options = {}) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
        throw new Error("Already enrolled in this course");
    }

    // paid courses must go through the payment flow (POST /api/payments/initialize)
    // so a user cannot self-enroll in a course they haven't paid for
    if (!options.skipPaymentCheck && course.price > 0) {
        const error = new Error("This course requires payment. Please checkout first.");
        error.code = "PAYMENT_REQUIRED";
        throw error;
    }

    const firstModule = await Module.findOne({ course: courseId }).sort({ order: 1 }).populate({
        path: "lessons",
        options: { sort: { order: 1 }, limit: 1 },
    });

    const enrollment = await Enrollment.create({
        user: userId,
        course: courseId,
        currentModule: firstModule ? firstModule._id : undefined,
        currentLesson: firstModule?.lessons?.[0] ? firstModule.lessons[0]._id : undefined,
    });

    return enrollment;
};

const getUserEnrollments = async (userId) => {
    return Enrollment.find({ user: userId }).populate("course").sort({ enrolledAt: -1 });
};

const getEnrollment = async (userId, courseId) => {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId })
        .populate("course")
        .populate("currentModule")
        .populate("currentLesson");

    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    const lessonProgress = await LessonProgress.find({ user: userId, course: courseId });

    return { ...enrollment.toObject(), lessonProgress };
};

const unenroll = async (userId, courseId) => {
    const enrollment = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
    if (!enrollment) {
        throw new Error("Enrollment not found");
    }
    await LessonProgress.deleteMany({ user: userId, course: courseId });
    return { success: true, message: "Unenrolled successfully" };
};

const completeLesson = async (userId, courseId, moduleId, lessonId, score) => {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }

    const alreadyCompleted = enrollment.completedLessons.some(
        (l) => l.toString() === lessonId
    );
    if (!alreadyCompleted) {
        enrollment.completedLessons.push(lessonId);
    }

    await LessonProgress.findOneAndUpdate(
        { user: userId, course: courseId, module: moduleId, lesson: lessonId },
        {
            status: "completed",
            progress: 100,
            completedAt: new Date(),
            ...(score !== undefined ? { quizScore: score } : {}),
            $inc: { attempts: 1 },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const course = await Course.findById(courseId);
    const totalLessons = course?.totalLessons || 0;
    enrollment.progress = totalLessons > 0
        ? Math.min(100, Math.round((enrollment.completedLessons.length / totalLessons) * 100))
        : 0;

    if (enrollment.progress >= 100) {
        enrollment.completed = true;
        enrollment.completedAt = new Date();
    }

    // advance to the next lesson within the module
    const module = await Module.findById(moduleId).populate({
        path: "lessons",
        options: { sort: { order: 1 } },
    });

    if (module) {
        const currentIndex = module.lessons.findIndex((l) => l._id.toString() === lessonId);
        const nextLesson = module.lessons[currentIndex + 1];

        if (nextLesson) {
            enrollment.currentModule = module._id;
            enrollment.currentLesson = nextLesson._id;
        } else {
            const nextModule = await Module.findOne({
                course: courseId,
                order: { $gt: module.order },
            }).sort({ order: 1 }).populate({
                path: "lessons",
                options: { sort: { order: 1 }, limit: 1 },
            });

            if (nextModule) {
                enrollment.currentModule = nextModule._id;
                enrollment.currentLesson = nextModule.lessons?.[0]?._id;
            }
        }
    }

    await enrollment.save();
    return enrollment;
};

module.exports = {
    enrollInCourse,
    getUserEnrollments,
    getEnrollment,
    unenroll,
    completeLesson,
};
