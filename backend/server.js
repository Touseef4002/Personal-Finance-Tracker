require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./src/routes/auth');
const User = require('./src/models/user.model');
const authenticate = require('./src/middleware/authmiddleware');

// Enhanced MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,  // Recommended option
  serverSelectionTimeoutMS: 5000,  // Fail fast if can't connect
})
.then(() => console.log('MongoDB connected successfully ✅'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);  // Exit process if DB connection fails
});

// Middleware
app.use(express.json());
app.use('/api/protected', authenticate);  // Protect routes with authentication middleware
// Routes
app.use('/api/auth', authRoutes);

app.get('/api/protected', (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user }); 
});

app.post('/api/login', async (req, res) => {
    try{
        const user = await User.findOne({username : req.body.username})

        if(!user){
            return res.status(401).json({message : "Invalid username or password"});
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).json({message : "Invalid username or password"});
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        });
        
        res.json({
            message: 'Login successful  ✅',
            user: { id : user._id, username: user.username},
            token
        });
    }

    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});