const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    order: {
      type: Number,
      required: true,
    },

    summary: {
      type: String,
    },

    type: {
      type: String,
      enum: [
        "video",
        "article",
        "code",
        "quiz",
        "exercise",
      ],
      default: "video",
    },

    videoUrl: {
      type: String,
    },

    content: [
      {
        heading: { type: String, required: true },
        body: { type: String, required: true },
      },
    ],

    code: {
      type: String,
    },

    quiz: {
      passingScore: { type: Number, default: 70 },
      questions: [
        {
          prompt: { type: String, required: true },
          options: [{ type: String, required: true }],
          answer: { type: Number, required: true }, // index into options
          explanation: { type: String },
        },
      ],
    },

    duration: {
      type: Number, // minutes
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Lesson", lessonSchema);