const nodemailer = require('nodemailer');

// Create a transporter using your SMTP service details
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any service (e.g., SendGrid, Mailgun)
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

module.exports = transporter;
