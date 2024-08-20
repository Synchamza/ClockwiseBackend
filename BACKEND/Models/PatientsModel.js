import mongoose from "mongoose";
import { Schema } from "mongoose";

const patientSchema = Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true,
    },
    phoneNumber: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    status: {
      type: String,
      value: ["approved", "rejected", "pending"],
      default: "pending",
    },
    age: {
      type: Number,
      // required: "true",
    },
    dob: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("patient", patientSchema);
