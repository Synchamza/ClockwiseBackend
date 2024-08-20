import mongoose from "mongoose";
import { Schema } from "mongoose";

const invoicesSchema = Schema(
    {
        invoiceNo: {
            type: Number
        },
        amount: {
            type: String,
            required: true
        },
        sendTo: {
            type: String
        },
        checkedBy: {
            type: String
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'paid'],
            default: 'pending'
        },
    },
    { timeStamps: true }
)

export default mongoose.model('invoice', invoicesSchema)