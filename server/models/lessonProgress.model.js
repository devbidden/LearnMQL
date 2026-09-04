const mongoose = require("mongoose");

const lessonProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    timeSpent: {
      type: Number,
      default: 0, // seconds
    },

    quizScore: {
      type: Number,
      default: null,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("LessonProgress", lessonProgressSchema);