const express = require('express');
const router= express.Router();
const {jwtAuthMiddleware}= require("../middlewares/jwt");
const {handleRegisterUser,handleloginUser,handleProfile,handleUpdateProfile}=require("../controllers/userController");


router.post("/register",handleRegisterUser);
router.post("/login",handleloginUser)
router.get("/profile",jwtAuthMiddleware,handleProfile);
router.put("/update",jwtAuthMiddleware,handleUpdateProfile);



module.exports = router;