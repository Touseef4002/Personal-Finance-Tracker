const Income = require("../models/Income");
const Expense = require("../models/Expense");

const {isValidObjectId, Types} = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    
}

