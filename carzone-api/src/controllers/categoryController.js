const Category = require('../models/Category');
const logActivity = require('./utils/logActivity');

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const category = new Category({ name, description });
    await category.save();

    await logActivity(
      "CREATE_CATEGORY",
      "Category",
      category._id,
      req.user?.name || "Admin",
      `Category ${name} was created.`
    );

    res.status(201).json({ message: "Category created successfully", category });
  } catch (err) {
    console.error("Error creating category:", err);
    next(err);
  }
};


// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    next(err);
  }
};

// Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });

    await logActivity(
      "UPDATE_CATEGORY",
      "Category",
      category._id,
      req.user?.name || "Admin",
      `Category ${category.name} was updated.`
    );

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (err) {
    console.error("Error updating category:", err);
    next(err);
  }
};

// Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await logActivity(
      "DELETE_CATEGORY",
      "Category",
      category._id,
      req.user?.name || "Admin",
      `Category ${category.name} was deleted.`
    );

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    next(err);
  }
};


exports.getCategoryCount = async (req, res, next) => {
  try {
    console.log("Fetching Category count process started...");

    const count = await Category.countDocuments();

    console.log("Fetching Category count process completed.");
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching Category count:", err);
    next(err);
  }
};