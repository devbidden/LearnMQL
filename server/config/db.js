const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("--- MongoDB Debug ---");
    console.log("MONGODB_URL exists:", !!process.env.MONGODB_URL);
    console.log("MongoDB readyState before:", mongoose.connection.readyState);

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not configured");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB connected successfully");
        console.log("MongoDB readyState after:", mongoose.connection.readyState);
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);

        throw error;
    }
};

module.exports = connectDB;