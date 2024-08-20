import express from "express";
import {
  createFaqs,
  updateFaqs,
  deleteFaqs,
  getFaqs,
  getAllFaqs,
  searchFaqs
} from "../Controllers/faqsController.js";
import { verifyFaqsAdmin, verifyToken } from "../Utils/verifyToken.js";
const faqsRoute = express.Router();

// http://{domain-name}/api/faqs/create
faqsRoute.post("/create",verifyToken, verifyFaqsAdmin, createFaqs);

// http://{domain-name}/api/faqs/:faqId
faqsRoute.put("/update/:faqsId",verifyToken, verifyFaqsAdmin, updateFaqs);

// http://{domain-name}/api/faqs/:faqId
faqsRoute.delete("/delete/:faqsId",verifyToken, verifyFaqsAdmin, deleteFaqs);

// http://{domain-name}/api/faqs/:faqId
faqsRoute.get("/getSingleFaqs/:faqsId",verifyToken, verifyFaqsAdmin, getFaqs);

// http://{domain-name}/api/faqs/find
faqsRoute.get("/find",verifyToken, getAllFaqs);

// http://{domain-name}/api/faqs/query
faqsRoute.get("/query",verifyToken, searchFaqs);

export default faqsRoute;
