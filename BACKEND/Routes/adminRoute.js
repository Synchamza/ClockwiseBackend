import express from "express";
import {
  register,
  login,
//   forgotPassword,
} from "../Controllers/adminController.js";
import {
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
  updateAdminPassword
} from "../Controllers/adminCrudController.js";

const adminRoutes = express.Router();

//localhost:8000/api/admin/signup
adminRoutes.post("/signup", register);

//localhost:8000/api/admin/login
adminRoutes.post("/login", login);

// localhost:8000/api/admin/update/:adminId
adminRoutes.put("/updateAdminPassword/:adminId", updateAdminPassword);

//localhost:8000/api/admin/updateAdmin
adminRoutes.put("/update/:adminId", updateAdmin);

//localhost:8000/api/admin/deleteAdmin
adminRoutes.delete("/delete/:adminId", deleteAdmin);


//localhost:8000/api/admin/getAdmin
adminRoutes.get("/getAdmin/:adminId", getAdmin);


//localhost:8000/api/admin/getAllAdmin
adminRoutes.get("/getAllAdmin", getAllAdmin);

export default adminRoutes;