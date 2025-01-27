const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    console.log('Registration request received:', req.body);

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a random password and hash it
    const password = Math.random().toString(36).substring(2, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Generated password:', password);
    console.log('Hashed password:', hashedPassword);

    // Save the user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('User created successfully:', user);

    // Send the email
    await sendWelcomeEmail(email, name, password);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during user registration:', err);
    next(err);
  }
};

// **Login Function**
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('Login request received:', req.body); // Debug log

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user); // Debug log

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid); // Debug log

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    next(err);
  }
};
