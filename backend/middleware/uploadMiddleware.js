const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configure multer to use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image file (JPEG, PNG, etc.).'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB file size limit
        files: 1 // Only 1 file per upload
    }
});

module.exports = upload;

