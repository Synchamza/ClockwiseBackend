import Admin from "../Models/AdminModel.js";
// import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { createError } from "../Utils/error.js";
import jwt from "jsonwebtoken";

const { genSalt, hash } = bcryptjs;

//=========================== Admin REGISTERATON ====================//
// localhost:8000/api/admin/signup
export const register = async (req, res, next) => {
  try {
    const {
      invoiceAdmin,
      appointmentAdmin,
      patientAdmin,
      physicianAdmin,
      productAdmin,
      slidingBannerAdmin,
      serviceAdmin,
      teamMemberAdmin,
      faqsAdmin,
      testimonialAdmin,
      contentPageAdmin,
    } = req.body;
    //==========HASHING PASSWORD USING BCRYPTJS===================//
    const salt = await genSalt(12);
    const hashPassword = await hash(req.body.password, salt);

    const newAdmin = new Admin({
      adminName: req.body.adminName,
      email: req.body.email,
      password: hashPassword,
      invoiceAdmin,
      appointmentAdmin,
      patientAdmin,
      physicianAdmin,
      productAdmin,
      slidingBannerAdmin,
      serviceAdmin,
      teamMemberAdmin,
      faqsAdmin,
      testimonialAdmin,
      contentPageAdmin,
    });

    //REMOVING CRITICAL INFO FROM THE DATA TO SEND THE RESPONSE

    const { password, ...other } = newAdmin._doc;

    //SAVING THE USER
    await newAdmin.save();

    res.status(200).send({
      status: "Successful",
      message: "Admin Register successfully",
      data: other,
    });
  } catch (error) {
    next(error);
  }
};

//=========================== ADMIN LOGIN ====================//
//localhost:8000/api/admin/login
export async function login(req, res, next) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    // console.log(admin);
    if (!admin) {
      // next(404, "User not found")
      next(createError(404, `Admin not found`)); //${message}
      return;
    }
    const isCorrect = await bcryptjs.compare(req.body.password, admin.password);
    if (!isCorrect) {
      // next(400, "Incorrect email or password")
      next(createError(400, "Incorrect email or password"));
      return;
    }
    const token = jwt.sign({ admin }, process.env.JWT, { expiresIn: "24h" });
    const { password, ...other } = admin._doc;
    // console.log;

    res.cookie("access_token", token, { httpOnly: true }).status(200).send({
      status: "Success",
      message: "Admin Login Successfully",
      data: other,
      access_token: token,
    });
  } catch (error) {
    // next(error.status, error.message)
    next(createError(error.status, error.message));
  }
}

//=========================== USER FORGOT PASSWORD ====================//
//localhost:8000/api/admin/login
// export async function forgotPassword(req, res, next) {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const Admin = await Admin.findOne({ email: email });
//       // console.log(user)
//       if (user) {
//         const secret = Admin._id + process.env.JWT;
//         const token = jwt.sign({ secret }, process.env.JWT, {
//           expiresIn: "30m",
//         });
//         const link = `http:localhost:8800/api/auth/resetpassword/usertoken/${token}`;
//         const transport = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.NODEMAILER_USER,
//             pass: process.env.NODEMAILER_PASS,
//           },
//         });

//         const mailOptions = {
//           from: process.env.EMAIL_FROM,
//           to: process.env.EMAIL_TO,
//           subject: "reset password link",
//           text: `Please click on the following link ${link} to reset your password`,
//         };

//         transport.sendMail(mailOptions, (err, info) => {
//           if (err) {
//             console.log(err.message);
//             return res.status(400).send({
//               status: "Failed",
//               message: err.message,
//             });
//           } else {
//             console.log("email send" + info.response);
//             return res.status(200).send({
//               status: "Success",
//               message: "Reset password link generated",
//             });
//           }
//         });
//       }
//     } else {
//       console.log("no user found");
//     }
//   } catch (error) {
//     next(createError(error.status, error.message));
//   }
// }
