const nodemailer = require('nodemailer');

exports.sendWelcomeEmail = async (email, name, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to CarZone!',
      text: `Hi ${name},\n\nWelcome to CarZone! Your account has been successfully created. Your temporary password is: ${password}\n\nPlease log in and update your password immediately.\n\nThank you,\nCarZone Team`,
    };


    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send welcome email.');
  }
};
