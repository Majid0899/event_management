const transporter = require('../config/nodemailer');

// Async function to send an email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Send booking confirmation email
exports.sendBookingConfirmation = async (userEmail, eventName) => {
    const subject = 'Booking Confirmation';
    const text = `Your booking for the event "${eventName}" has been confirmed!`;

    try {
        await sendEmail(userEmail, subject, text);
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

// Send cancellation email
exports.sendCancellationEmail = async (userEmail, eventName) => {
    const subject = 'Booking Cancellation';
    const text = `Your booking for the event "${eventName}" has been successfully cancelled.`;

    try {
        await sendEmail(userEmail, subject, text);
    } catch (error) {
        console.error('Error sending cancellation email:', error);
    }
};
