const cloudinary = require("cloudinary").v2;

const configureCloudinary = () => {
    const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length) {
        throw new Error(`Cloudinary is not configured. Missing: ${missing.join(', ')}`);
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const connectcloudinary = async () => {
    try {
        configureCloudinary();
        console.log("Cloudinary connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};



module.exports = { cloudinary, connectcloudinary, configureCloudinary };
