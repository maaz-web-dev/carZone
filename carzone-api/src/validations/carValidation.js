// middleware/carValidation.js
const { body, validationResult } = require('express-validator');

exports.validateCar = [
  body('category').notEmpty().withMessage('Category is required'),
  body('color').notEmpty().withMessage('Color is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('make').notEmpty().withMessage('Make is required'),
  body('registrationNo').notEmpty().withMessage('Registration number is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('fuelType').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid']).withMessage('Invalid fuel type'),
  body('mileage').isNumeric().withMessage('Mileage must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
