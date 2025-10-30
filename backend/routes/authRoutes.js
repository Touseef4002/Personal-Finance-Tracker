const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo,

} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single('image'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});

// routes/authRoutes.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload-image", upload.single('image'), async (req, res) => {
    console.log('=== UPLOAD DEBUG START ===');
    
    if(!req.file) {
        console.log('❌ No file received from multer');
        return res.status(400).json({ message: "No file uploaded" });
    }

    console.log('✅ File received by multer:', req.file.originalname);

    try {
        // Upload to Cloudinary
        console.log('Uploading to Cloudinary...');
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'personal-finance-profiles',
            resource_type: 'image'
        });

        console.log('✅ Cloudinary upload successful:', result.secure_url);

        res.status(200).json({ 
            message: "Image uploaded successfully", 
            imageUrl: result.secure_url 
        });

    } catch (error) {
        console.error('❌ Cloudinary upload failed:', error);
        res.status(500).json({ 
            message: "Image upload failed",
            error: error.message 
        });
    }
});

module.exports = router;