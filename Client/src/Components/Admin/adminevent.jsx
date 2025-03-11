import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { api } from "../../axios";
import AdminNavbar from "./adminnavbar";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();


  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events");
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to load events.");
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/admin/events/${eventId}`);
      toast.success("Event deleted successfully.");
      fetchEvents(); 
    } catch (error) {
      toast.error("Failed to delete event.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <AdminNavbar />
    <div className="p-6 w-full min-h-screen mt-5 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Event Management</h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/event/${event._id}`)}
          >
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm">Created by: {event.createdBy|| "Unknown"}</p>

              <button
                className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDelete(event._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default EventManagement;
