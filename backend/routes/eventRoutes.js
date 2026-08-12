const express = require("express");
const Event = require("../models/event");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
});

module.exports = router;