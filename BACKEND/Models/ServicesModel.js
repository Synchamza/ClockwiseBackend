import mongoose from "mongoose";
import { Schema } from "mongoose";

const ServicesModel = Schema(
    {
        Title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Blocked'],
            default: "Active"
        },
        summary: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String,
            required: true
        },
        pageTitle: {
            type: String
        },
        metaKeywords: {
            type: [String]
        },
        metaDescription: {
            type: String
        },

    },
    { timeStamps: true }
)

export default mongoose.model('service', ServicesModel)