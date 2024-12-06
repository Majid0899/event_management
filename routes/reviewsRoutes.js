const express=require('express');
const {handleAddReview,handleGetReviews}=require('../controllers/reviewController');
const {jwtAuthMiddleware}=require("../middlewares/jwt");

const router=express.Router();

router.post("/add",jwtAuthMiddleware,handleAddReview)
router.get("/",handleGetReviews);

module.exports = router;