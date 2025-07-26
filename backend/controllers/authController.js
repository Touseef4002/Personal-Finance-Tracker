const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, profileImageUrl} = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            profileImageUrl
        });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token: generateToken(user._id)
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

//Login a user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try{
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }
}

// Get user information
exports.getUserInfo = async (req, res) => {

}

