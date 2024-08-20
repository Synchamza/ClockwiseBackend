import express from "express";

import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonial,
  updateTestimonial,
  searchTestimonialByClientName
} from "../Controllers/testimonialController.js";
// import { verifyInvoiceAdmin, verifyToken } from "../Utils/verifyToken.js";
const testimonialRoute = express.Router();
// verifyToken, verifyInvoiceAdmin,
testimonialRoute.post("/create", createTestimonial);
testimonialRoute.put("/update/:testimonialId", updateTestimonial);
testimonialRoute.delete("/delete/:testimonialId", deleteTestimonial);
testimonialRoute.get("/find", getAllTestimonial);
testimonialRoute.get("/query", searchTestimonialByClientName);

export default testimonialRoute;
