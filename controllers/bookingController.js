const BookingModel=require('../models/bookingModel');



const handleBookingTicket=async(req,res)=>{
    const user_id=req.user.id;
    const {event_id}=req.body;
    console.log(event_id);
    try {
        const booking=await BookingModel.bookTicket(user_id,event_id);
        return res.status(201).json({booking:booking,message:"Booking Confirmed"});

        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }
}
const handleGetBookings=async(req,res)=>{
    const userId=req.user.id;
    try {
        const booking=await BookingModel.getBookings(userId);
        res.status(201).json(booking)
        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }
    
    

}
const handleCancelBooking=async(req,res)=>{
    const user_id=req.user.id;
    const booking_id=req.params.id;

    try {
        await BookingModel.cancelBooking(booking_id,user_id);

    res.status(201).json("Booking has been canceled")
        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }
    

}

module.exports={
    handleBookingTicket,
    handleGetBookings,
    handleCancelBooking
}