import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../axios";
import { toast } from "react-hot-toast";
import UserNavbar from "./usernavbar";




const CreateEvent = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.user.token);

    const [event, setEvent] = useState({
        title: "",
        image: "",
        subtitles: [{ title: "", image: "", content: "" }],
        services: [{ title: "", image: "" }],
        date: "",
        location: "",
        createdBy: userId,
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubtitleChange = (index, field, value) => {
        const updatedSubtitles = [...event.subtitles];
        updatedSubtitles[index][field] = value;
        setEvent({ ...event, subtitles: updatedSubtitles });
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...event.services];
        updatedServices[index][field] = value;
        setEvent({ ...event, services: updatedServices });
    };

    const addSubtitle = () => {
        setEvent({ ...event, subtitles: [...event.subtitles, { title: "", image: "", content: "" }] });
    };

    const addService = () => {
        setEvent({ ...event, services: [...event.services, { title: "", image: "" }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/user/create", event, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Event created successfully!");
            navigate("/user-dashboard");
        } catch (err) {
            toast.error("Failed to create event.");
        }
    };

    return (
        <div>
 <UserNavbar/>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Title" value={event.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="image" placeholder="Image URL" value={event.image} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                
                <h3 className="text-lg font-semibold">Subtitles</h3>
                {event.subtitles.map((subtitle, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="Title" value={subtitle.title} onChange={(e) => handleSubtitleChange(index, "title", e.target.value)} className="p-2 border rounded" />
                        <input type="text" placeholder="Image URL" value={subtitle.image} onChange={(e) => handleSubtitleChange(index, "image", e.target.value)} className="p-2 border rounded" />
                        <input type="text" placeholder="Content" value={subtitle.content} onChange={(e) => handleSubtitleChange(index, "content", e.target.value)} className="p-2 border rounded" />
                    </div>
                ))}
                <button type="button" onClick={addSubtitle} className="text-blue-500">+ Add Subtitle</button>
                
                <h3 className="text-lg font-semibold">Services</h3>
                {event.services.map((service, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Service Title" value={service.title} onChange={(e) => handleServiceChange(index, "title", e.target.value)} className="p-2 border rounded" />
                        <input type="text" placeholder="Service Image URL" value={service.image} onChange={(e) => handleServiceChange(index, "image", e.target.value)} className="p-2 border rounded" />
                    </div>
                ))}
                <button type="button" onClick={addService} className="text-blue-500">+ Add Service</button>
                
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create Event</button>
            </form>
        </div>
        </div>
    );
};

export default CreateEvent;
