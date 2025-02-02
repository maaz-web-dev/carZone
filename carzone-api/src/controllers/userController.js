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
 

    await sendWelcomeEmail(email, name, password);

    console.log(`User registration successful: ${email}`);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const userName = user.name
    console.log(`Login successful for user: ${email}`);
    return res.status(200).json({ token, userName, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message || err);
    next(err);
  }
};


exports.updatePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    next(err);
  }
};
