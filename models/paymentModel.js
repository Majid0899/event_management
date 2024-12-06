const { verify } = require('jsonwebtoken');
const db = require('../config/db');

const PaymentModel={
    addPayment:async(user_id,event_id,amount,currency,order)=>{
        const query = `INSERT INTO payments (user_id, event_id, amount, currency, payment_status, razorpay_order_id) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(query, [user_id, event_id, amount, currency, 'pending', order.id]);

    },
    verifyPayment:async()=>{
        const query = `UPDATE payments 
                       SET payment_status = 'success', razorpay_payment_id = ?, razorpay_signature = ? 
                       WHERE razorpay_order_id = ?`;
        await db.query(query, [razorpay_payment_id, razorpay_signature, razorpay_order_id]);
    }

}

module.exports = PaymentModel