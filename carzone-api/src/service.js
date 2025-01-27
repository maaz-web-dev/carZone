const app = require('./app'); // Import your Express app
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected'); // Log successful MongoDB connection
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`); // Log server info
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err); // Log DB connection error
  });
