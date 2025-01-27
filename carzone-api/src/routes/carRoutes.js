const express = require('express');
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getCarCount,
} = require('../controllers/carController');
const { validateCar } = require('../validations/carValidation');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate,validateCar, createCar); 
router.get('/', authenticate, getCars); 
router.put('/:id', authenticate,validateCar, updateCar); 
router.delete('/:id', authenticate, deleteCar); 
router.get('/count', authenticate, getCarCount);

module.exports = router;