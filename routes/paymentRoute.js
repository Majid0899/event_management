const express=require('express');
const {handleCreateOrder,hanldeVerifyPayment}=require("../controllers/paymentController")
const {jwtAuthMiddleware}=require("../middlewares/jwt");
const router= express.Router();


router.post("/create-order",jwtAuthMiddleware,handleCreateOrder);
router.post("/verify-payment",hanldeVerifyPayment,)

module.exports = router;