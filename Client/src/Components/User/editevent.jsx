import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { api } from "../../axios";
import { updateEvent } from "../redux/eventslice";
import UserNavbar from "./usernavbar";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events?.events || []);
  const token = useSelector((state) => state.user?.token);
  const eventToEdit = events.find((event) => event._id === eventId);

  const [event, setEvent] = useState({
    title: "",
    image: "",
    date: "",
    location: "",
    subtitles: [{ title: "", image: "", content: "" }],
    services: [{ title: "", image: "" }],
  });

  useEffect(() => {
    if (eventToEdit) {
      setEvent(eventToEdit);
    } else {
      api
        .get(`/${eventId}`)
        .then((res) => setEvent(res.data))
        .catch((err) => console.error("Error fetching event:", err));
    }
  }, [eventToEdit, eventId]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...event[field]];
    updatedArray[index][e.target.name] = e.target.value;
    setEvent({ ...event, [field]: updatedArray });
  };

  const handleAddField = (field, defaultValues) => {
    setEvent({ ...event, [field]: [...event[field], defaultValues] });
  };

  const handleRemoveField = (field, index) => {
    const updatedArray = [...event[field]];
    updatedArray.splice(index, 1);
    setEvent({ ...event, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/user/edit/${eventId}`, event, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateEvent(response.data.updatedEvent));
      toast.success("Event updated successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Failed to update event.");
    }
  };

  if (!event.title) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
 <UserNavbar/>
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-lg font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100"
          required
        />
         <label className="block text-lg font-medium">Image Url</label>
        <input
          type="text"
          name="image"
          value={event.image}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100"
          placeholder="Image URL"
          required
        />
          <label className="block text-lg font-medium">Date</label>
        <input
          type="date"
          name="date"
          value= {event.date ? new Date(event.date).toISOString().split("T")[0] : ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100"
          required
        />
         <label className="block text-lg font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100"
          placeholder="Location"
          required
        />

        <h3 className="text-lg font-semibold">Subtitles</h3>
        {event.subtitles.map((subtitle, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <input
              type="text"
              name="title"
              value={subtitle.title}
              onChange={(e) => handleArrayChange(e, index, "subtitles")}
              className="w-full p-2 rounded bg-gray-100"
              placeholder="Subtitle Title"
              required
            />
            <input
              type="text"
              name="image"
              value={subtitle.image}
              onChange={(e) => handleArrayChange(e, index, "subtitles")}
              className="w-full p-2 rounded bg-gray-100"
              placeholder="Subtitle Image URL"
              required
            />
            <input
              type="text"
              name="content"
              value={subtitle.content}
              onChange={(e) => handleArrayChange(e, index, "subtitles")}
              className="w-full p-2 rounded bg-gray-100"
              placeholder="Subtitle Content"
              required
            />
            <button type="button" onClick={() => handleRemoveField("subtitles", index)} className="bg-red-500 text-white px-2 py-1 rounded">
              Remove Subtitle
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField("subtitles", { title: "", image: "", content: "" })} className="bg-green-500 text-white px-2 py-1 rounded">
          Add Subtitle
        </button>

        <h3 className="text-lg font-semibold">Services</h3>
        {event.services.map((service, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={(e) => handleArrayChange(e, index, "services")}
              className="w-full p-2 rounded bg-gray-100"
              placeholder="Service Title"
              required
            />
            <input
              type="text"
              name="image"
              value={service.image}
              onChange={(e) => handleArrayChange(e, index, "services")}
              className="w-full p-2 rounded bg-gray-100"
              placeholder="Service Image URL"
              required
            />
            <button type="button" onClick={() => handleRemoveField("services", index)} className="bg-red-500 text-white px-2 py-1 rounded">
              Remove Service
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField("services", { title: "", image: "" })} className="bg-green-500 text-white px-2 py-1 rounded">
          Add Service
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Update Event
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateEvent;
