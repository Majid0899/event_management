const EventModel = require("../models/eventModel");

const handleCreateEvent = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Access denied");
  }
  const { name, description, category, date, location, available_seats } =
    req.body;
  try {
    const event = await EventModel.create(
      name,
      description,
      category,
      date,
      location,
      available_seats
    );
    res
      .status(201)
      .json({ event: event, message: "Event created successfully" });
  } catch (error) {
    //Debuggin Purpose
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const handleGetAllEvents = async (req, res) => {
  try {
    const events = await EventModel.getAllEvents();
    res.status(201).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
const handleCategoryEvent = async (req, res) => {
  const category = req.params.category;
  try {
    const events = await EventModel.getEventByCategory(category);
    res.status(201).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
const handleDeleteEvent = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Access denied");
  }

  const eventId = req.params.id;
  console.log(eventId);
  try {
    await EventModel.deleteEvent(eventId);
    res.status(201).json("Event Deleted Sucessfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
const handleUpdateEvent = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Access denied");
  }
  const eventId = req.params.id;
  
  const { name, description, category, date, location, available_seats } =
    req.body;

  try {
    //find Event
    const event = await EventModel.findEventById(eventId);

    if (!event) {
      return res.status(404).json("Event Not Found");
    }
    const result = await EventModel.updateEvent(eventId, {
      name,
      description,
      category,
      date,
      location,
      available_seats,
    });
    res
      .status(201)
      .json({ result: result, message: "Event Updated Successfully" });
  } catch (error) {
  console.error(error.message);
  res.status(500).json({ error: "Internal Server error" });}
};

module.exports = {
  handleCreateEvent,
  handleGetAllEvents,
  handleCategoryEvent,
  handleDeleteEvent,
  handleUpdateEvent,
};
