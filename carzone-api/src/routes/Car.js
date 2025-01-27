const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    make: { type: String, required: true },
    registrationNo: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', CarSchema);