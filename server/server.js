const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const connectDB = require("./config/db");
const connectcloudinary = require("./config/cloudinary").connectcloudinary;
const { verifyEmailTransport } = require("./utils/email");
const app = require("./app");
const PORT = process.env.PORT || 5000;
const webhook = require("./rapi/webhook");

async function startServer() { 
    try {
        await connectDB();
        connectcloudinary();
        verifyEmailTransport();
        app.use("/api/webhook", webhook);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Server startup failed: ${error.message}`);
        process.exitCode = 1;
    }
}
 
startServer();