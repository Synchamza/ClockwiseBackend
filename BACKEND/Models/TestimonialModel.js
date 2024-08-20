import mongoose from "mongoose";
import { Schema } from "mongoose";

const testimonialModel = Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
    designation: {
      type: String,
    },

    testimonials: {
      type: String,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("testimonial", testimonialModel);
