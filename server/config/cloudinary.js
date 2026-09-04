const cloudinary = require("cloudinary").v2;


const connectcloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        console.log("Cloudinary connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};



module.exports = { cloudinary, connectcloudinary };