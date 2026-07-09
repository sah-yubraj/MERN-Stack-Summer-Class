const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose'); 
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/professionalsDB'; // Use the environment variable or fallback to local MongoDB
// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

app.use(express.json());


const authController = require('./Controllers/authController');
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// app.post('/api/login', authController.loginUser);


// Import professionals routes
const professionalsRoutes = require('./Routes/professionalsRoutes');
app.use('/api/professionals', professionalsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});