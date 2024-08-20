import PhysicianModel from "../Models/PhysicianModel.js";
// import { createError } from "../Utils/error";

export const createPhysician = async (req, res, next) => {
  const newPhysician = new PhysicianModel(req.body);
  try {
    const savedPhysician = await newPhysician.save();
    res.status(200).json({
      status: "success",
      message: "Physician created successfully",
      data: savedPhysician,
    });
  } catch (error) {
    next(error);
  }
};

export const pendingPhysician = async (req, res, next) => {
  try {
    const physician = await PhysicianModel.find({ status: "pending" });
    // res.status(200).json(physician);
    res.status(200).json({
      status: "success",
      message: "Your request is pending",
      data: physician,
    });
  } catch (error) {
    next(error);
  }
};

export const approvedPhysician = async (req, res, next) => {
  try {
    const physician = await PhysicianModel.find({ status: "approved" });
    // res.status(200).json(physician);
    res.status(200).json({
      status: "success",
      message: "Your request is approved",
      data: physician,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectedPhysician = async (req, res, next) => {
  try {
    const physician = await PhysicianModel.find({ status: "rejected" });
    // res.status(200).json(physician);
    res.status(200).json({
      status: "success",
      message: "Your request is rejected",
      data: physician,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPhysicians = async (req, res, next) => {
  try {
    const physician = await PhysicianModel.find();
    // res.status(200).json(physician);
    res.status(200).json({
      status: "success",
      message: "Physicians fetched successfully",
      data: physician,
    });
  } catch (error) {
    next(error);
  }
};

export const searchPhysician = async (req, res, next) => {
  const { physicianName } = req.query;
  const queryObject = {};

  if (physicianName) {
    queryObject.physicianName = physicianName;
    console.log(queryObject);
  }

  try {
    const searchResult = await PhysicianModel.find({
      physicianName: { $regex: physicianName, $options: "i" },
    }).limit(40); // Use queryObject instead of req.query

    // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
    console.log(searchResult);

    if (searchResult.length > 0) {
      // Check if searchRes contains any data
      res.status(200).json({
        message: "Physician found",
        data: searchResult,
      });
    } else {
      res.status(404).json({
        // Change status code to 404 for "Not Found"
        message: "Physician not found",
        status: "failed",
      });
    }
  } catch (error) {
    console.error("Error searching Physician:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePhysician = async (req, res, next) => {
  try {
    const physician = await PhysicianModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Physician updated successfully",
      data: physician,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePhysician = async (req, res, next) => {
  try {
    await PhysicianModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Physician deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
