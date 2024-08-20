import express from "express";

import {
  updatePhysician,
  deletePhysician,
  getAllPhysicians,
  createPhysician,
  searchPhysician
  //   getPhysician,
  //   getPhysicians,
} from "../Controllers/physicianController.js";
import { verifyPhysicianAdmin, verifyToken } from "../Utils/verifyToken.js";

const physicianRoute = express.Router();

physicianRoute.get("/find", verifyToken, getAllPhysicians)
physicianRoute.put("/update/:physicianId", verifyToken, verifyPhysicianAdmin, updatePhysician);
physicianRoute.post("/create", verifyToken, verifyPhysicianAdmin, createPhysician);
physicianRoute.delete("/delete/:physicianId", verifyToken, verifyPhysicianAdmin, deletePhysician);
physicianRoute.get("/search", searchPhysician);

export default physicianRoute;