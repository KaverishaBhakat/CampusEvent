const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/event");

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// GET /api/events - Retrieve events with optional search and date filtering
router.get("/", async (req, res, next) => {
  try {
    const { search, date } = req.query;
    const queryFilter = {};

    if (search && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      const regex = new RegExp(safeSearch, "i");
      queryFilter.$or = [
        { title: regex },
        { description: regex },
        { location: regex },
      ];
    }

    if (date) {
      const startDate = new Date(date);
      if (!isNaN(startDate.getTime())) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        queryFilter.date = {
          $gte: startDate,
          $lt: endDate,
        };
      }
    }

    const events = await Event.find(queryFilter).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// POST /api/events - Create new event
router.post("/", async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Event title is required" });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Event description is required" });
    }
    if (!date) {
      return res.status(400).json({ message: "Event date is required" });
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid event date format" });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ message: "Event location is required" });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: parsedDate,
      location: location.trim(),
    });

    res.status(201).json(event);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// GET /api/events/:id - Fetch single event by ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// PUT /api/events/:id - Update event by ID
router.put("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const updateData = {};
    if (req.body.title !== undefined) {
      if (!req.body.title.trim()) {
        return res.status(400).json({ message: "Event title cannot be empty" });
      }
      updateData.title = req.body.title.trim();
    }
    if (req.body.description !== undefined) {
      if (!req.body.description.trim()) {
        return res.status(400).json({ message: "Event description cannot be empty" });
      }
      updateData.description = req.body.description.trim();
    }
    if (req.body.date !== undefined) {
      const parsedDate = new Date(req.body.date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid event date format" });
      }
      updateData.date = parsedDate;
    }
    if (req.body.location !== undefined) {
      if (!req.body.location.trim()) {
        return res.status(400).json({ message: "Event location cannot be empty" });
      }
      updateData.location = req.body.location.trim();
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// DELETE /api/events/:id - Delete event by ID
router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;