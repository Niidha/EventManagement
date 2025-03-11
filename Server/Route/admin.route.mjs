import { Router } from "express";

import { Auth, } from "../Middleware/auth.mjs";
import { deleteEvent, deleteUser,  getAllEvents,  getAllUsers, getStats, suspendUser, updateUserRole } from "../Controller/admin.controller.mjs";


const AdminRoute = Router();


AdminRoute.get("/users",Auth, getAllUsers);
AdminRoute.patch("/users/suspend/:userId", Auth, suspendUser);
AdminRoute.delete("/users/:userId", Auth, deleteUser);
AdminRoute.delete("/events/:eventId", Auth, deleteEvent);
AdminRoute.get("/stats", Auth, getStats);
AdminRoute.get("/events", Auth, getAllEvents);
AdminRoute.get("/role/:userId", Auth, updateUserRole);

export default AdminRoute
