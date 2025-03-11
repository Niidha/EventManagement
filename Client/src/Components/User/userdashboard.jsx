import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios";

import "./userdashboard.css";
import UserNavbar from "./usernavbar";

const UserDashboard = () => {
    const [events, setEvents] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.username) { 
            api
                .get(`/user/get/${user.username}`)  
                .then((res) => setEvents(res.data))
                .catch((err) => console.error("Error fetching events:", err));
        }
    }, [user?.username]); 

    return (
        <div>
            <UserNavbar />  
            
            <div className="dashboard-container">
                <h2 className="dashboard-title">🎉 My Created Events</h2>
                {events.length === 0 ? (
                    <p className="no-events">No events found. Start creating now!</p>
                ) : (
                    <div className="events-grid">
                        {events.map((event) => (
                            <div 
                                key={event._id} 
                                className="event-card" 
                                onClick={() => navigate(`/event/${event._id}`)}
                            >
                                <img src={event.image} alt={event.title} className="event-img" />
                                <div className="event-info">
                                    <h3 className="event-title">{event.title}</h3>
                                    <p className="event-date">📅 {event.date ? new Date(event.date).toLocaleDateString() : "No Date"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
