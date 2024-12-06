const express = require('express');
const { handleCreateEvent, handleGetAllEvents,handleCategoryEvent,handleDeleteEvent,handleUpdateEvent } = require('../controllers/eventController');
const {jwtAuthMiddleware}=require("../middlewares/jwt");
const router = express.Router();

router.post("/create",jwtAuthMiddleware, handleCreateEvent);
router.get('/', handleGetAllEvents)
router.get("/:category",handleCategoryEvent);
router.put("/update/:id",jwtAuthMiddleware, handleUpdateEvent);
router.delete("/remove/:id",jwtAuthMiddleware,handleDeleteEvent);

module.exports = router;
