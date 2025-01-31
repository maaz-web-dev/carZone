const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryCount,
} = require('../controllers/categoryController');
const { validateCategory } = require('../validations/categoryValidation');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate,validateCategory, createCategory); 
router.get('/', authenticate, getCategories); 
router.put('/:id', authenticate,validateCategory, updateCategory);
router.delete('/:id', authenticate, deleteCategory); 
router.get('/count', authenticate, getCategoryCount);


module.exports = router;