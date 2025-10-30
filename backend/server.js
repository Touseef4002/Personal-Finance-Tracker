require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes"); 
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

app.use(express.json({ limit: '10mb' })); // ✅ Increase general payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//Serve uoploads folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const createUploadsDir = () => {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        console.log('Creating uploads directory...');
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Uploads directory created at:', uploadsDir);
    } else {
        console.log('Uploads directory already exists at:', uploadsDir);
    }
};

createUploadsDir();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});