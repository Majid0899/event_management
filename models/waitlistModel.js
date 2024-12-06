const db=require('../config/db');

const WaitlistModel={
    addWaitlist:async(userId,eventId)=>{
        const sql="INSERT INTO waitlist(user_id,event_id) VALUES(?,?)"
        const [waitlist]=await db.promise().query(sql,[userId,eventId]);
        return waitlist;


    },
    getWaitlistByEvent:async(eventId)=>{
        const sql="SELECT * FROM waitlist WHERE event_id=?"
        const [listWaiting]=await db.promise().query(sql,[eventId])
        return listWaiting;


    }

}

module.exports = WaitlistModel
