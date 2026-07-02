const express = require('express');
const mongoose = require('mongoose');   // <-- Add this
require('dotenv').config();             // <-- Add this

const app = express();
const port = 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/professionalsDB';  // <-- Add this

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

app.use(express.json());

// Import professionals routes
const professionalsRoutes = require('./Routes/professionalsRoutes');
app.use('/api/professionals', professionalsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});