const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    make: { type: String, required: true },
    registrationNo: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    mileage: { type: Number, required: true }, // in km/l or miles/gallon
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', CarSchema);
