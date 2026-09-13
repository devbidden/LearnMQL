const mongoose = require("mongoose");

let connectionPromise;

const connectDB = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not configured");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (mongoose.connection.readyState === 2 && connectionPromise) {
        return connectionPromise;
    }

    try {
        console.log("Connecting to MongoDB");
        connectionPromise = mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        await connectionPromise;
        console.log("MongoDB connected successfully");
        return mongoose.connection;
    } catch (error) {
        connectionPromise = undefined;
        console.error("MongoDB connection failed:");
        console.error(error);
        throw error;
    }
};

module.exports = connectDB;
