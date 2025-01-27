const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// **Register User**
exports.registerUser = async (req, res, next) => {
  try {
    console.log('Starting user registration process...');

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const password = Math.random().toString(36).substring(2, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    await sendWelcomeEmail(email, name, password);

    console.log(`User registration successful: ${email}`);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during user registration:', err.message || err);
    next(err);
  }
};

// **Login User**
exports.loginUser = async (req, res, next) => {
  try {
    console.log('Starting user login process...');

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User not found with email ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Login failed: Invalid password for email ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`Login successful for user: ${email}`);
    return res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message || err);
    next(err);
  }
};
