import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./Routes/authRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import invoiceRoute from "./Routes/invoiceRoute.js";
import appointmentsRoute from "./Routes/appointmentsRoute.js";
import patientsRoute from "./Routes/patientRoute.js";
import teamMembersRoute from "./Routes/teamMemberRoute.js";
import productsRoute from "./Routes/productsRoute.js";
import uploadRoute from "./Routes/uploadRoute.js";
import physicianRoute from "./Routes/PhysicianRoute.js";
import faqsRoute from "./Routes/faqsRoute.js";
import servicesRoute from "./Routes/servicesRoute.js";
import bannerRoute from "./Routes/bannerRoutes.js";
import testimonialRoute from "./Routes/testimonialRoute.js";
import meetRoute from "./Routes/zoomMeetRoute.js";

dotenv.config();
const app = express();

//Port defined in env if in no one in .env then 8500 is executed.. ====>
const PORT = process.env.PORT || 8000;

// Connect to MongoDB =====>
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Backend Connected");
    })
    .catch((error) => {
      throw error;
    });
};

// Middlewares=====>>>>
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
//Reading in json file for this body parser =====>
app.use(cors());

// middlewares =====>
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/invoice", invoiceRoute);

app.use("/api/appointments", appointmentsRoute);
app.use("/api/products", productsRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/patient", patientsRoute);
app.use("/api/physicians", physicianRoute);
app.use("/api/teamMembers", teamMembersRoute);
app.use("/api/faqs", faqsRoute);
app.use("/api/services", servicesRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/meeting-link", meetRoute);

//Error Middleware ====>
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  const errorStack = err.stack || "No stack trace available";

  console.error("error stack", errorStack);
  console.error("error Message", errorMessage);

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: errorStack,
  });
});

// SERVER LISTENING ON THE PORT
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on this ${PORT}`);
});
