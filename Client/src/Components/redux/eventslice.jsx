import { createSlice } from "@reduxjs/toolkit";

const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: storedEvents,
    loading: false,
    error: null,
  },
  reducers: {
    createEvent: (state, action) => {
      const newEvent = {
        _id: action.payload._id || "", // Use _id instead of id
        title: action.payload.title || "",
        image: action.payload.image || "",
        subtitles: action.payload.subtitles || [],
        services: action.payload.services || [], // Store services correctly
        createdBy: action.payload.createdBy || "",
      };

      state.events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    updateEvent: (state, action) => {
      const updatedEvents = state.events.map((event) =>
        event._id === action.payload._id ? { ...event, ...action.payload } : event
      );
      state.events = updatedEvents;
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    },
    deleteEvent: (state, action) => {
      const filteredEvents = state.events.filter((event) => event._id !== action.payload);
      state.events = filteredEvents;
      localStorage.setItem("events", JSON.stringify(filteredEvents));
    },
    setEvents: (state, action) => {
      state.events = action.payload;
      localStorage.setItem("events", JSON.stringify(action.payload));
    },
  },
});

export const { createEvent, updateEvent, deleteEvent, setEvents } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
