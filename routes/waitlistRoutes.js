const express = require('express');
const {handleAddWaitlist,handleGetWaitlist}=require('../controllers/waitlistController');
const router = express.Router();
const {jwtAuthMiddleware}=require("../middlewares/jwt");


router.post('/add',jwtAuthMiddleware,handleAddWaitlist);

router.get('/:event_id',jwtAuthMiddleware,handleGetWaitlist);

module.exports = router;

// POST /waitlist: Join the waitlist for an event.
// GET /waitlist/:event_id: Admin views the waitlist for an event.