const express = require("express");
const { PrismaClient } = require("@prisma/client");
const roleCheck = require("../../middleware/roleCheck");

const prisma = new PrismaClient();
const router = express.Router();

// Create an Event (Admin/Organizer)
router.post("/", roleCheck(["admin", "organizer"]), async (req, res) => {
  try {
    const { name, description, dateTime, duration, type, capacity } = req.body;
    const organizerId = req.user.id;

    const event = await prisma.event.create({
      data: { name, description, dateTime, duration, type, capacity, organizerId },
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Get All Events (Public)
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Update an Event (Admin/Organizer)
router.put("/:id", roleCheck(["admin", "organizer"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, dateTime, duration, type, capacity } = req.body;

    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: { name, description, dateTime, duration, type, capacity },
    });

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// Delete an Event (Admin/Organizer)
router.delete("/:id", roleCheck(["admin", "organizer"]), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
