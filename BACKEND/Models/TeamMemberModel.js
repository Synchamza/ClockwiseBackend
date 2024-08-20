import mongoose from "mongoose";
import { Schema } from "mongoose";

const teamModel = Schema(
    {
        teamMemberName: {
            type: String,
            required: true
        },
       
        status: {
            type: String,
            enum: ['Active', 'Block'],
            default: "Active"
        },
        
        description: {
            type: String
        },
        image: {
            type: String
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

export default mongoose.model('teamMember', teamModel)