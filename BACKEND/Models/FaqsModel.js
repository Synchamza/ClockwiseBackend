import mongoose from "mongoose";
import { Schema } from "mongoose";

const faqsModel = Schema(
    {
        question: {
            type: String,
            required: true
        },
       
        answer: {
            type: String,
        },
        status : {
            type :String,
            enum : ['Active','Blocked'],
            default : "Active"
        },
        
    },
    { timeStamps: true }
)

export default mongoose.model('faq', faqsModel)