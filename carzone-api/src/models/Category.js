const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: 'No description provided' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
