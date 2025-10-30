const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Use HTTPS
});

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// Image upload endpoint
router.post("/upload-image", upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: false,
            message: 'No file uploaded' 
        });
    }

    try {
        // Create a unique filename with original extension
        const fileExtension = req.file.originalname.split('.').pop();
        const publicId = `profile-${uuidv4()}.${fileExtension}`;

        // Convert buffer to base64
        const fileBase64 = req.file.buffer.toString('base64');
        const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri, {
            public_id: publicId,
            folder: 'personal-finance-profiles',
            resource_type: 'auto',
            quality: 'auto:good',
            fetch_format: 'auto'
        });

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
            publicId: result.public_id
        });

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message
        });
    }
});

module.exports = router;