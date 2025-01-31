const app = require('./app'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected'); 
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`); 
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err); 
  });
