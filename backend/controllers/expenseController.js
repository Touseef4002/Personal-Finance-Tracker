const XLSX = require("xlsx");
const Expense = require("../models/Expense");


//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;

        if(!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense source added successfully", Expense: newExpense });
    }
    catch (error) {
        console.error("Error adding Expense:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Get All Expenses
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const Expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(Expense);
    }
    catch (error) {
        console.error("Error fetching Expenses:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense source deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting Expense:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Download Expense as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const Expense = await Expense.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel 
        const data = Expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        XLSX.writeFile(wb, "Expenses.xlsx");
        res.download("Expenses.xlsx");
    }
    catch (error) {
        console.error("Error downloading Expense as Excel:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}