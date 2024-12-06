const WaitlistModel=require('../models/waitlistModel');


const handleAddWaitlist=async (req,res)=>{
    const{event_id}=req.body;
    const user_id=req.user.id; 
    try {
        const waitlist=await WaitlistModel.addWaitlist(user_id,event_id);   
        res.status(201).json({waitlist:waitlist,message:"Added to Waitlist"})
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }

}
const handleGetWaitlist=async (req,res)=>{
    const event_id=req.params.event_id;
    try {
        const [waitlist]=await WaitlistModel.getWaitlistByEvent(event_id);
        res.status(201).json(waitlist);
        
    } catch (error) {
        console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
    }
     


}

module.exports = {
    handleAddWaitlist,
    handleGetWaitlist
}