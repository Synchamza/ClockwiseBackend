import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    invoiceAdmin: {
      type: Boolean,
      default: false,
    },
    appointmentAdmin: {
      type: Boolean,
      default: false,
    },

    patientAdmin: {
      type: Boolean,
      default: false,
    },

    physicianAdmin: {
      type: Boolean,
      default: false,
    },
    productAdmin: {
      type: Boolean,
      default: false,
    },
    slidingBannerAdmin: {
      type: Boolean,
      default: false,
    },
    serviceAdmin: {
      type: Boolean,
      default: false,
    },
    teamMemberAdmin: {
      type: Boolean,
      default: false,
    },
    faqsAdmin: {
      type: Boolean,
      default: false,
    },
    testimonialAdmin: {
      type: Boolean,
      default: false,
    },
    contentPageAdmin: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
