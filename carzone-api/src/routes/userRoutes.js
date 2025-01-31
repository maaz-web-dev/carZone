const express = require('express');
const { registerUser, loginUser, updatePassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
console.log("testrwe");
router.post('/login', loginUser);
router.post('/update-password', updatePassword);

module.exports = router;
