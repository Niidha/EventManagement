import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, 

  subtitles: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true }, 
      content: { type: String, required: true }, 
    }
  ],

  services: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true }, 
    }
  ],

  date: { type: Date, required: false },
  location: { type: String, required: false },

  createdBy: { type: String, required: true }, 
});

export const Events = model("Events", EventSchema);
