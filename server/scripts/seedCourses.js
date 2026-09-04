/**
 * Seeds the database with the course/module/lesson content that used to live in
 * client/src/data/curriculum.js. Run with: `npm run seed` from server/.
 * Re-running this script wipes and re-creates all Course/Module/Lesson documents.
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Course = require("../models/courses.model");
const Module = require("../models/modules.model");
const Lesson = require("../models/lesson.model");

const parseMinutes = (duration) => {
    const match = String(duration || "").match(/\d+/);
    return match ? Number(match[0]) : 0;
};

const seed = async () => {
    await connectDB();

    const curriculumPath = path.join(__dirname, "..", "..", "client", "src", "data", "curriculum.js");
    const { curriculum } = await import(`file://${curriculumPath}`);

    console.log(`Loaded ${curriculum.length} course(s) from curriculum.js`);

    await Lesson.deleteMany({});
    await Module.deleteMany({});
    await Course.deleteMany({});

    for (const [courseIndex, courseData] of curriculum.entries()) {
        const course = await Course.create({
            title: courseData.title,
            slug: courseData.slug,
            description: courseData.description,
            category: "MQL5",
            price: courseData.price,
            level: (courseData.level || "beginner").toLowerCase(),
            duration: courseData.duration,
            status: "published",
            featured: courseIndex === 0,
        });

        const moduleIds = [];
        let totalLessons = 0;

        for (const [moduleIndex, moduleData] of courseData.modules.entries()) {
            const module = await Module.create({
                course: course._id,
                title: moduleData.title,
                order: moduleIndex + 1,
                isPublished: true,
            });

            const lessonIds = [];

            for (const [lessonIndex, lessonData] of moduleData.lessons.entries()) {
                const lesson = await Lesson.create({
                    module: module._id,
                    title: lessonData.title,
                    order: lessonIndex + 1,
                    summary: lessonData.summary,
                    type: "article",
                    content: lessonData.content,
                    quiz: lessonData.quiz,
                    duration: parseMinutes(lessonData.duration),
                    isPublished: true,
                });
                lessonIds.push(lesson._id);
            }

            module.lessons = lessonIds;
            await module.save();

            moduleIds.push(module._id);
            totalLessons += lessonIds.length;
        }

        course.modules = moduleIds;
        course.totalModules = moduleIds.length;
        course.totalLessons = totalLessons;
        await course.save();

        console.log(`Seeded course "${course.title}" (${moduleIds.length} modules, ${totalLessons} lessons)`);
    }

    console.log("Seeding complete.");
    await mongoose.disconnect();
    process.exit(0);
};

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});
