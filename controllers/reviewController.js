const ReviewModel=require('../models/reviewModel');

const handleAddReview=async(req,res)=>{
    const {event_id, review_text, rating}=req.body;
    const userId=req.user.id;
    try {
        const review=await ReviewModel.addReview(userId,event_id,review_text,rating);
        //update Event Rating and Review
        await ReviewModel.updateEventReview(event_id);
        res.status(201).json({review:review,message:"Review Added Successfully"})
        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }

    
}
const handleGetReviews=async(req,res)=>{
    const {event_id}=req.body;
    try {
        const reviews=await ReviewModel.getReviews(event_id);

        res.status(201).json(reviews);
        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }

}
module.exports={
    handleAddReview,
    handleGetReviews,
}