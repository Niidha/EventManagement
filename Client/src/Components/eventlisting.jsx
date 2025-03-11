import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./event.css"; 
import MyNavbar from "./Layouts/NavBar";

export const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/event/all")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <MyNavbar />
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-center text-3xl font-semibold mb-6 pb-5">📅 Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event._id} className="event-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="mt-4">
                  <Link to={`/event/${event._id}`} className="text-blue-500 font-semibold hover:underline">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
