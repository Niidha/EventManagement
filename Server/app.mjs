 import env from "dotenv"
import cors from "cors"
import express from "express"
import dbConnect from "./Config/db.config.mjs"
import UserRoute from "./Route/user.route.mjs"
import EventRoute from "./Route/event.route.mjs"
import AdminRoute from "./Route/admin.route.mjs"
import { events, systemStats, users } from "./data.mjs"



env.config()
await dbConnect()
const app =express()
app.use(express.json())
app.use(cors())
app.get("/event/api/events", (req, res) => {
    res.json(events);
  });
  
  // API route to fetch users data
  app.get("/event/api/users", (req, res) => {
    res.json(users);
  });
  
  // API route to fetch system stats
  app.get("/event/api/system-stats", (req, res) => {
    res.json(systemStats);
  });

app.use("/event/user",UserRoute);
app.use("/event",EventRoute)
app.use("/event/admin", AdminRoute)




app.listen(process.env.PORT||5050,err=>{
    if(err){
        return process.exit(1)
    }
    console.log("Running...");
    
})