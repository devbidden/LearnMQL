const { Readable } = require("stream");
const { cloudinary } = require("../config/cloudinary");

// streams a buffer straight to Cloudinary without writing a temp file to disk
const uploadBufferToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        Readable.from(buffer).pipe(uploadStream);
    });
};

module.exports = { uploadBufferToCloudinary };
