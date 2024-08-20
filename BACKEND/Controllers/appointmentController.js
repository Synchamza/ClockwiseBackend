import AppointmentModel from "../Models/AppointmentModel.js"
import { createError } from "../Utils/error.js"


// createAppointments api ===>
export const createAppointments = async (req, res, next) => {
  
    try {
        const createAppointement = await new AppointmentModel(
            {
                ...req.body
            }
        )

        const saveAppointement = await createAppointement.save()

        res.status(200).json({
            status: "success",
            message: 'created Appointment successfully',
            data: saveAppointement
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}



// updateAppointments api ===>
export const updateAppointments = async (req, res, next) => {
    try {
        const appointmentId = req.params.appointmentId
        // console.log(invoiceId)
        const updateAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, { $set: req.body }, { new: true })

        // console.log(updateInvoices)
        res.status(200).json({
            status: "success",
            message: 'update Appointment successfully',
            data: updateAppointment
        })
    } catch (error) {
        next(error)
    }
}



// getRejectedAppointments api ===>
export const getRejectedAppointments = async (req, res, next) => {
    try {
        const PendingAppointment = await AppointmentModel.find({ status: 'rejected' });

        res.status(200).json({
            status: "success",
            message: "Fetched pending Appointment successfully",
            data: PendingAppointment
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};




// getCompletedAppointments api ===>
export const getCompletedAppointments = async (req, res, next) => {
    try {
        const completedAppointments = await AppointmentModel.find({ status: 'completed' });

        res.status(200).json({
            status: "success",
            message: "Fetched completed Appointment successfully",
            data: completedAppointments
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};



// deleteAppointments api ===>
export const deleteAppointments = async (req, res, next) => {
    try {
        const appointmentId = req.params.appointmentId
        const appointment = await InvoicesModel.findById(appointmentId)
        if(!appointment) {
            res.status(404).json({
                status: "failed",
                message: 'invoice not found',
            })
        }
        await AppointmentModel.findByIdAndDelete(appointmentId)
        res.status(200).json({
            status: "success",
            message: 'Delete Appointment successfully',
        })
    } catch (error) {
        next(error)
    }
}




// getSingleAppointments api ===>
export const getSingleAppointments = async (req, res, next) => {
    try {
        const appointmentId = req.params.appointmentId
        const SingleAppointment = await AppointmentModel.findById(appointmentId)
        res.status(200).json({
            status: "success",
            message: 'found Appointment successfully',
            data: SingleAppointment
        })
    } catch (error) {
        next(error)
    }
}




// getAllAppointments api ===>
export const getAllAppointments = async (req, res, next) => {
    try {
        const allAppointment = await AppointmentModel.find()
        res.status(200).json({
            status: "success",
            message: 'found all Appointment successfully',
            data: allAppointment
        })
    } catch (error) {
        next(error)
    }
}

