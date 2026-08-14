const express = require("express");
const Event = require("../models/event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
});

module.exports = router;