const express=require("express");
const bodyParser=require("body-parser");
const db=require("./config/db");
require("dotenv").config();

const app=express();

app.use(bodyParser.json());


//userRoute
const userRoute=require("./routes/userRoutes")
app.use("/user",userRoute)

//eventRoute
const eventRoute=require("./routes/eventRoutes")
app.use("/event",eventRoute)

//bookingRoute
const bookingRoute=require("./routes/bookingsRoutes")
app.use("/booking",bookingRoute)

//reviewRoute
const reviewRoute=require("./routes/reviewsRoutes")
app.use("/reviews",reviewRoute)

const waitlistRoute=require("./routes/waitlistRoutes")
app.use("/waitlist",waitlistRoute)

const paymentRoute=require("./routes/paymentRoute")
app.use("/payment",paymentRoute)



app.listen(process.env.PORT || 5000,()=> {
    console.log("Server Started");
})    