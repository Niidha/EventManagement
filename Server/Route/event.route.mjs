import { Router } from "express"

import { getAllEvents, getEventById } from "../Controller/event.controller.mjs";
import { getNotifications, sendNotification } from "../Controller/notification.controller.mjs";



const EventRoute = Router();

EventRoute.get("/all", getAllEvents);
EventRoute.get("/:eventId", getEventById);
EventRoute.post("/notification/send", sendNotification);
EventRoute.get("/notification", getNotifications);

export default EventRoute;
