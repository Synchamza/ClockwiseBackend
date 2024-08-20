import mongoose from "mongoose";
import { Schema } from "mongoose";

const SlidingBannerModel = Schema(
    {
        image: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['Active', 'Blocked'],
            default: "Active"
        },
    },
    { timeStamps: true }
)

export default mongoose.model('slidingBanner', SlidingBannerModel)