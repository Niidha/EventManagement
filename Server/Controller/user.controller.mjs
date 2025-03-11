import bcrypt from "bcrypt";
import env from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../Model/user.model.mjs";
import { Events } from "../Model/event.model.mjs";
env.config();


export const signUp = async (req, res) => {
  try {
    const { body } = req;

  
    const usernameCount = await User.countDocuments({ username: body.username });
    if (usernameCount > 0) {
      return res.status(409).send({ message: "Username already exists" });
    }

   
    body.password = await bcrypt.hash(body.password, 10);
    
   
    const response = await User.create(body);
    if (!response?._id) {
      return res.status(400).send({ message: "Bad request" });
    }

    response.password = undefined;
   
    let jwtKey;
    switch (response.role) {
        case "admin":
          jwtKey = process.env.JWT_KEY_ADMIN;
          break;
        case "user":
          jwtKey = process.env.JWT_KEY_USER;
          break;
        default:
          jwtKey = process.env.JWT_KEY_USER; // Default to 'user' if role is not explicitly defined
          break;
      }
      

    const token = jwt.sign({ id: response._id, role: response.role }, jwtKey, { expiresIn: "30d" });

    return res.status(201).send({ message: "User created!", user: response, token });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    user.password = undefined; 

  
    let jwtKey;
    switch (user.role) {
        case "admin":
          jwtKey = process.env.JWT_KEY_ADMIN;
          break;
        case "user":
          jwtKey = process.env.JWT_KEY_USER;
          break;
        default:
          jwtKey = process.env.JWT_KEY_USER; // Default to 'user' if role is not explicitly defined
          break;
      }
      
   
    const token = jwt.sign({ id: user._id, role: user.role }, jwtKey, { expiresIn: "7d" });

    return res.status(200).send({ message: "User logged in", user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal server error" });
  }
};
export const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, username, email, password, status } = req.body;
  
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      // Update user details
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          username,
          email,
          status,
          ...(password && { password: hashedPassword }), // Only update password if provided
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).send({
        message: "Profile updated successfully",
        updatedUser: {
          ...updatedUser._doc,
          password: null, // Hide password from response
        },
      });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Internal server error" });
    }
  };
  export const getUserDetails = async (req, res) => {
    try {
      const { userId } = req.params; 
  
     
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).send({ user });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Internal server error" });
    }
  };
  export const getEventByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        
        const events = await Events.find({ createdBy: username });

        if (!events.length) {
            return res.status(404).json({ message: "No events found for this user" });
        }

        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};
