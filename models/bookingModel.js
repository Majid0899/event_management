const db=require("../config/db");
const notificationController=require('../controllers/notificationController')

const BookingModel={
    bookTicket:async(userId,eventId)=>{
        //check if seats are available or not
    const checkSeats="SELECT available_seats,name FROM events WHERE id=?"
  
    const [event]=await db.promise().query(checkSeats,[eventId]);
    
    if(event[0].available_seats<=0){
        return res.status(400).json({message:"No seats are available"})
    }
    const sql="INSERT INTO bookings(user_id,event_id) VALUES(?,?)"
    const [booking]=await db.promise().query(sql,[userId,eventId]);

    const userQuery = `SELECT email FROM users WHERE id = ?`;
    const [user] = await db.promise().query(userQuery, [userId]);

    await notificationController.sendBookingConfirmation(user[0].email, event[0].name);

    return booking
    },

    getBookings:async(userId)=>{
        const sql="SELECT * FROM bookings WHERE user_id=?"
        const [bookings]=await db.promise().query(sql,[userId]); 
        return bookings;
    },
    cancelBooking:async(bookingId,user_id)=>{
        const userQuery = `SELECT email FROM users WHERE id = ?`;
    const [user] = await db.promise().query(userQuery, [user_id]);

    const [event_id]=await db.promise().query("SELECT event_id FROM bookings WHERE id=?",[bookingId]);

    const [event_name]=await db.promise().query("SELECT name FROM events WHERE id=?",[event_id[0].event_id])


      await notificationController.sendCancellationEmail(user[0].email,event_name[0].name);

        


        const sql="DELETE FROM bookings WHERE id=?"

        await db.promise().query(sql,[bookingId])

        
    }



}
module.exports = BookingModel