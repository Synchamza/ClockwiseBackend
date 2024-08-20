import express from "express";
import {
  createAppointments,
  updateAppointments,
  getRejectedAppointments,
  getCompletedAppointments,
  deleteAppointments,
  getSingleAppointments,
  getAllAppointments,
} from "../Controllers/appointmentController.js";
import { verifyAppointmentAdmin, verifyToken } from "../Utils/verifyToken.js";

const appointmentsRoute = express.Router();

// appointments route middlewares ====>
appointmentsRoute.post("/create", verifyToken, verifyAppointmentAdmin, createAppointments);
appointmentsRoute.put(
  "/update/:appointmentId",
  verifyToken,
  verifyAppointmentAdmin,
  updateAppointments
);
appointmentsRoute.delete(
  "/delete/:appointmentId",
  verifyToken,
  verifyAppointmentAdmin,
  deleteAppointments
);
appointmentsRoute.get(
  "/getSingle/:appointmentId",
  verifyToken,
  verifyAppointmentAdmin,
  getSingleAppointments
);
appointmentsRoute.get("/find", verifyToken, verifyAppointmentAdmin, getAllAppointments);
appointmentsRoute.get(
  "/rejected",
  verifyToken,
  verifyAppointmentAdmin,
  getRejectedAppointments
);
appointmentsRoute.get(
  "/completed",
  verifyToken,
  verifyAppointmentAdmin,
  getCompletedAppointments
);

export default appointmentsRoute;
