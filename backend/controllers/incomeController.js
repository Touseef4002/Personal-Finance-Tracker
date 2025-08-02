const User = require("../models/userModel");
const Income = require("../models/Income");

//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(201).json({ message: "Income source added successfully", income: newIncome });
    }
    catch (error) {
        console.error("Error adding income:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Get All Incomes
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    }
    catch (error) {
        console.error("Error fetching incomes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Delete Income Source
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income source deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting income:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Download Income as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel 
        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));
    }
}