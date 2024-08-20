import TeamMemberModel from "../Models/TeamMemberModel.js";

export const createTeamMember = async (req, res, next) => {
  try {
    const createTeamMember = await new TeamMemberModel({
      ...req.body,
    });

    const saveTeamMember = await createTeamMember.save();

    res.status(200).json({
      status: "success",
      message: "created Team Member successfully",
      data: saveTeamMember,
    });
  } catch (error) {
    // createError(error.status, error.message)
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const teamMemberId = req.params.teamMemberId;
    // console.log(invoiceId)
    const updateTeamMember = await TeamMemberModel.findByIdAndUpdate(
      teamMemberId,
      { $set: req.body },
      { new: true }
    );

    // console.log(updateInvoices)
    res.status(200).json({
      status: "success",
      message: "update Team Member successfully",
      data: updateTeamMember,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const teamMemberId = req.params.teamMemberId;
    await TeamMemberModel.findByIdAndDelete(teamMemberId);
    res.status(200).json({
      status: "success",
      message: "Delete team Member successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamMember = async (req, res, next) => {
  try {
    const teamMemberId = req.params.teamMemberId;
    const teamMember = await TeamMemberModel.findById(teamMemberId);
    res.status(200).json({
      status: "success",
      message: "found team Member successfully",
      data: teamMember,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTeamMembers = async (req, res, next) => {
  try {
    const allTeamMembers = await TeamMemberModel.find();
    res.status(200).json({
      status: "success",
      message: "found all Team Members successfully",
      data: allTeamMembers,
    });
  } catch (error) {
    next(error);
  }
};


export const searchTeamMember = async (req, res, next) => {
    const { teamMemberName } = req.query;
    const queryObject = {};
  
    if (teamMemberName) {
      queryObject.teamMemberName = teamMemberName;
      console.log(queryObject);
    }
  
    try {
      const searchResult = await TeamMemberModel.find({
        teamMemberName: { $regex: teamMemberName, $options: "i" },
      }).limit(40); // Use queryObject instead of req.query
  
      // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
      console.log(searchResult);
  
      if (searchResult.length > 0) {
        // Check if searchRes contains any data
        res.status(200).json({
          message: "team Member found",
          data: searchResult,
        });
      } else {
        res.status(404).json({
          // Change status code to 404 for "Not Found"
          message: "team Member not found",
          status: "failed",
        });
      }
    } catch (error) {
      console.error("Error searching Patients:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };