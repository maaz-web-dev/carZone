const Car = require("../models/car");

// Create a new car
exports.createCar = async (req, res, next) => {
  try {
    console.log("Car creation process started...");

    const {
      category,
      color,
      model,
      make,
      registrationNo,
      price,
      fuelType,
      mileage,
    } = req.body;

    if (
      !category ||
      !color ||
      !model ||
      !make ||
      !registrationNo ||
      !price ||
      !fuelType ||
      !mileage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const car = new Car({
      category,
      color,
      model,
      make,
      registrationNo,
      price,
      fuelType,
      mileage,
    });
    await car.save();

    console.log("Car creation process completed.");
    res.status(201).json({ message: "Car created successfully", car });
  } catch (err) {
    console.error("Error creating car:", err);

    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Registration number already exists" });
    }

    next(err);
  }
};

// Get all cars with pagination and sorting
exports.getCars = async (req, res, next) => {
  try {
    console.log("Fetching cars process started...");

    const { page = 1, limit = 10, sort = "createdAt" } = req.query;

    const cars = await Car.find()
      .populate("category", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCars = await Car.countDocuments();

    console.log("Fetching cars process completed.");
    res.status(200).json({
      cars,
      pagination: {
        total: totalCars,
        currentPage: Number(page),
        totalPages: Math.ceil(totalCars / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching cars:", err);
    next(err);
  }
};

// Update a car by ID
exports.updateCar = async (req, res, next) => {
  try {
    console.log("Car update process started...");

    const { id } = req.params;
    const updates = req.body;

    const car = await Car.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    console.log("Car update process completed.");
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (err) {
    console.error("Error updating car:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Registration number already exists" });
    }
    next(err);
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res, next) => {
  try {
    console.log("Car deletion process started...");

    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    console.log("Car deletion process completed.");
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    next(err);
  }
};

// Get total count of cars
exports.getCarCount = async (req, res, next) => {
  try {
    console.log("Fetching car count process started...");

    const count = await Car.countDocuments();

    console.log("Fetching car count process completed.");
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching car count:", err);
    next(err);
  }
};
