const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const activityLogRoutes = require("./routes/activityLogRoutes")
const carRoutes = require('./routes/carRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/activity-log', activityLogRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
module.exports = app;
