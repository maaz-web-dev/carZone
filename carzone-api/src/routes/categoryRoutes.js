const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createCategory); // Create category
router.get('/', authenticate, getCategories); // Get all categories
router.put('/:id', authenticate, updateCategory); // Update category
router.delete('/:id', authenticate, deleteCategory); // Delete category

module.exports = router;