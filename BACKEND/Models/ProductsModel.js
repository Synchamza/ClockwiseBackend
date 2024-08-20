import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductsModel = Schema(
    {
        productName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Out of stock', 'Not Active'],
            default: "Active"
        },
        summary: {
            type: String
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

export default mongoose.model('product', ProductsModel)