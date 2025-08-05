const Income = require("../models/Income");
const Expense = require("../models/Expense");

const {isValidObjectId, Types} = require("mongoose");

//Dashboard Data
const getDashboardData = async (req, res) => {
    const userId = req.user.id;
}