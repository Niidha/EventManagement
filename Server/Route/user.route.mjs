import { Router } from "express"
import { Auth } from "../Middleware/auth.mjs";
import { getEventByUsername, getUserDetails, login, signUp, updateUser } from "../Controller/user.controller.mjs";
import { createEvent, deleteEvent,updateEvent } from "../Controller/event.controller.mjs";




const UserRoute = Router();

UserRoute.post("/signup", signUp);
UserRoute.post("/login", login);
UserRoute.get("/:userId", Auth, getUserDetails);
UserRoute.patch("/update/:userId",Auth, updateUser);
UserRoute.post("/create", Auth, createEvent);
UserRoute.patch("/edit/:eventId", Auth, updateEvent);
UserRoute.delete("/delete/:eventId", Auth, deleteEvent);
UserRoute.get("/get/:username",getEventByUsername)



export default UserRoute;
