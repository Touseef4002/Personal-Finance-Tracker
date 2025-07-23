const jwt = require('jsonwebtoken');

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

// Register a new user
exports.registerUser = async (req, res) => {
    
}

//Login a user
exports.loginUser = async (req, res) => {

}

// Get user information
exports.getUserInfo = async (req, res) => {

}