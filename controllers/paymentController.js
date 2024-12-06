const Razorpay = require('razorpay');
const crypto = require('crypto');
const PaymentModel = require("../models/paymentModel");
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const handleCreateOrder=async(req,res)=>{

    const {event_id, amount, currency } = req.body;
    const user_id=req.user.id;

    try {
        // Create a Razorpay order
        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log(order)

        // Insert the order into the database
        await PaymentModel.addPayment(user_id,event_id,amount,currency,order);

        res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            message: 'Order created successfully',
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create order' });
    }

}
const hanldeVerifyPayment=async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Verify the Razorpay signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ error: 'Payment verification failed' });
        }

        // Update the payment record in the database
        await PaymentModel.verifyPayment(razorpay_payment_id,razorpay_signature,razorpay_order_id);

        res.status(200).json({ message: 'Payment verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to verify payment' });
    }

}

module.exports = {
    handleCreateOrder,
    hanldeVerifyPayment
}