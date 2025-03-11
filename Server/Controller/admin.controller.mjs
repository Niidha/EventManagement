import { Events } from "../Model/event.model.mjs";
import { User } from "../Model/user.model.mjs";



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "suspended" : "active";
    await user.save();

    res.status(200).json({ message: `User ${user.status} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Events.findByIdAndDelete(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const suspendedUsers = await User.countDocuments({ status: "suspended" });
    const totalEvents = await Events.countDocuments();

    const activeUserList = await User.find(
      { status: "active" },
      "name email"
    ).lean();

  
    const suspendedUserList = await User.find(
      { status: "suspended" },
      "name email"
    ).lean();

    res.status(200).json({
      totalUsers,
      activeUsers,
      suspendedUsers,
      totalEvents,
      activeUserList,
      suspendedUserList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find(); 
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;


  const allowedRoles = ["user",  "admin"];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
};

