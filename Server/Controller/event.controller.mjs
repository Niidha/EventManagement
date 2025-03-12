import { Events } from "../Model/event.model.mjs";
import { User } from "../Model/user.model.mjs";



export const createEvent = async (req, res) => {
  try {
    const { title, image, subtitles, services, date, location } = req.body;
    const userId = req.user.id;

    // Fetch username from User model
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const createdBy = user.username; // Store username instead of user ID

    const event = await Events.create({
      title,
      image,
      subtitles,
      services,
      date,
      location,
      createdBy, // Username is stored here
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Events.findById(eventId).populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized! User not authenticated" });
    }

    const { eventId } = req.params;
    const { title, image, subtitles, services } = req.body;
    const userId = req.user.id;

    // Fetch username using userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Compare event.createdBy with fetched username
    if (event.createdBy !== user.username) {
      return res.status(403).json({ message: "Unauthorized! You can only edit your own event" });
    }

    const updatedEvent = await Events.findByIdAndUpdate(
      eventId,
      { title, image, subtitles, services },
      { new: true }
    );

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    console.error("Error in updateEvent:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Events.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

