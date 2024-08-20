import mongoose from "mongoose";
import { Schema } from "mongoose";

const appointmentSchema = Schema(
    {
        trackingCode: {
            type: Number
        },
        desiredDate: {
            type: String,
            // required: true
        },
        desiredTime: {
            type: String,
            // required: true
        },
        assignTo: {
            type: String
        },
        requestedBy: {
            type: String
        },
        status: {
            type: String,
            enum: ['approved', 'rejected', "completed"],
            default: 'approved'
        },
        invoice: {
            type: String,
            value: ['paid', 'Pending Invoice'],
            default: 'pending'
        },
    },
    { timeStamps: true }
)

export default mongoose.model('appointment', appointmentSchema)