const express = require('express');
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getCarCount,
} = require('../controllers/carController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createCar); 
router.get('/', authenticate, getCars); 
router.put('/:id', authenticate, updateCar); 
router.delete('/:id', authenticate, deleteCar); 
router.get('/count', authenticate, getCarCount);

module.exports = router;