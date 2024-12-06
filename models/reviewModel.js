const db=require('../config/db');

const ReviewModel={
    addReview:async (user_id,event_id,review_text,rating) => {
        const sql="INSERT INTO reviews(user_id,event_id,review_text,rating) VALUES(?,?,?,?)";
        const [review]=await db.promise().query(sql,[user_id,event_id,review_text,rating]);

        

        
        return review;
        
    },
    updateEventReview:async (event_id)=>{
        const updateRatingQuery = `
        UPDATE events
        SET rating = (SELECT AVG(rating) FROM reviews WHERE event_id = ?), review_count = (SELECT COUNT(*) FROM reviews WHERE event_id = ?)
        WHERE id = ?
    `;
    await db.promise().query(updateRatingQuery,[event_id,event_id,event_id]);

    },
    getReviews:async(event_id)=>{
        const sql="SELECT * FROM reviews WHERE event_id=?"
        const [reviews]=await db.promise().query(sql,[event_id])
        return reviews;  
    }

}

module.exports = ReviewModel