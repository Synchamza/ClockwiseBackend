import mongoose from "mongoose";
import { Schema } from "mongoose";

const PhysicianSchema = Schema(
  {
    physicianName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
    },
    experience: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
  },
  { timeStamps: true }
);

export default mongoose.model("physicians", PhysicianSchema);
