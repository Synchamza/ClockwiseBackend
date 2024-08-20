import patientSchema from "../Models/PatientsModel.js"
import { createError } from "../Utils/error.js"


// createPatients api ===>
export const createPatients = async (req, res, next) => {
    try {
        const createPatients = await new patientSchema(
            {
                ...req.body
            }
        )

        const savePatients = await createPatients.save()

        res.status(200).json({
            status: "success",
            message: 'created Patients successfully',
            data: savePatients
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}



// updatePatients api ===>
export const updatePatients = async (req, res, next) => {
    try {
        const patientId = req.params.patientId
        // console.log(patientId)
        const updatePatients = await patientSchema.findByIdAndUpdate(patientId, { $set: req.body }, { new: true })

        console.log(updatePatients)
        res.status(200).json({
            status: "success",
            message: 'update Patients successfully',
            data: updatePatients
        })
    } catch (error) {
        next(error)
    }
}




// RejectedPatients api ===>
export const RejectedPatients = async (req, res, next) => {
    try {
        const rejectedPatients = await patientSchema.find({ status: 'rejected' });

        res.status(200).json({
            status: "success",
            message: "Fetched rejected Patients successfully",
            data: rejectedPatients
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};



// ApprovedPatients api 
export const ApprovedPatients = async (req, res, next) => {
    try {
        const ApprovedPatients = await patientSchema.find({ status: 'approved' });

        res.status(200).json({
            status: "success",
            message: "Fetched approved Patients successfully",
            data: ApprovedPatients
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};




// deletePatients api ===>
export const deletePatients = async (req, res, next) => {
    try {
        const patientId = req.params.patientId
        await patientSchema.findByIdAndDelete(patientId)
        res.status(200).json({
            status: "success",
            message: 'Delete Patients successfully',
        })
    } catch (error) {
        next(error)
    }
}




// SinglePatient api ===>
export const SinglePatient = async (req, res, next) => {
    try {
        const patientId = req.params.patientId
        const SinglePatient = await patientSchema.findById(patientId)
        res.status(200).json({
            status: "success",
            message: 'found Patients successfully',
            data: SinglePatient
        })
    } catch (error) {
        next(error)
    }
}




// AllPatients api ===>
export const AllPatients = async (req, res, next) => {
    try {
        const allPatients = await patientSchema.find()
        res.status(200).json({
            status: "success",
            message: 'found all Patients successfully',
            data: allPatients
        })
    } catch (error) {
        next(error)
    }
}





export const searchPatients = async (req, res, next) => {
    const { patientName } = req.query;
    const queryObject = {};
  
    if (patientName) {
      queryObject.patientName = patientName;
      console.log(queryObject);
    }
  
    try {
      const searchResult = await patientSchema.find({
        patientName: { $regex: patientName, $options: "i" },
      }).limit(40); // Use queryObject instead of req.query
  
      // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
      console.log(searchResult);
  
      if (searchResult.length > 0) {
        // Check if searchRes contains any data
        res.status(200).json({
          message: "Patient found",
          data: searchResult,
        });
      } else {
        res.status(404).json({
          // Change status code to 404 for "Not Found"
          message: "Patient not found",
          status: "failed",
        });
      }
    } catch (error) {
      console.error("Error searching Patients:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };