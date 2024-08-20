import express from "express";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  getAllInvoice,
  getPendingInvoices,
  getCompletedInvoices,
} from "../Controllers/invoiceController.js";
import { verifyInvoiceAdmin, verifyToken } from "../Utils/verifyToken.js";
const invoiceRoute = express.Router();

invoiceRoute.post("/create", verifyToken, verifyInvoiceAdmin, createInvoice);
invoiceRoute.put("/update/:invoiceId", verifyToken, verifyInvoiceAdmin, updateInvoice);
invoiceRoute.delete("/delete/:invoiceId", verifyToken, verifyInvoiceAdmin, deleteInvoice);
invoiceRoute.get("/getSingle/:invoiceId", verifyToken, verifyInvoiceAdmin, getInvoice);
invoiceRoute.get("/find", verifyToken, verifyInvoiceAdmin, getAllInvoice);
invoiceRoute.get("/pending", verifyToken, verifyInvoiceAdmin, getPendingInvoices);
invoiceRoute.get("/completed", verifyToken, verifyInvoiceAdmin, getCompletedInvoices);

export default invoiceRoute;
