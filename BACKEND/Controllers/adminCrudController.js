import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";

// //UPDATE ADMIN
// http://localhost:8000/api/admin/660b37d3da1211544662db30
export const updateAdmin = async (req, res, next) => {
  try {
    // Check if password update is requested
    if (req.body.password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }

    // Update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.adminId,
      {
        $set: req.body,
      },
      { new: true }
    );

    // Remove password field from the response
    const { password, ...adminData } = updatedAdmin._doc;

    res.status(200).send({
      status: "Successful",
      message: "Admin Updated Successfully",
      data: adminData,
    });
  } catch (error) {
    next(error);
  }
};

// //DELETE ADMIN
// http://localhost:8800/api/admin/delete/:adminID

export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.adminId);
    res.status(200).send({
      status: "Successful",
      message: "Admin deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// //GET ADMIN
// http://localhost:8800/api/admin/find/660b413793cbd11706eb9a32

export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.adminId);
    !admin &&
      res.status(404).send({
        status: "Failed",
        message: "Admin not found",
      });
    res.status(200).send({
      status: "Successful",
      message: "Admin Found",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL Admins
// http://localhost:8800/api/admin/getAllAdmins/
export const getAllAdmin = async (req, res, next) => {
  try {
    // Database query to retrieve all Admin
    const allAdmins = await Admin.find();

    // Sending the retrieved Admins as response
    res.status(200).json({
      status: "Success",
      message: "All Admins retrieved successfully",
      data: allAdmins,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving Admins:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve Admins",
      error: error.message,
    });
  }
};




export const updateAdminPassword = async (req, res, next) => {
  try {
    console.log("Request received to update password"); // Log request

    const adminId = req.params.adminId;
    const { currentPassword, newPassword } = req.body;

    // console.log(`Admin ID: ${adminId}`); // Log adminId
    // console.log(`Current Password: ${currentPassword}`); // Log current password
    // console.log(`New Password: ${newPassword}`); // Log new password

    // Fetch the current admin data from the database
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).send({
        status: "Failed",
        message: "Admin not found",
      });
    }

    // Check if the current password matches the one in the database
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).send({
        status: "Failed",
        message: "Current password is incorrect",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // Update the password field only
    admin.password = hashPassword;
    await admin.save();

    res.status(200).send({
      status: "Successful",
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error); // Log errors
    next(error);
  }
};

