import fs from "fs-extra";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


export const uploadImages = async (req, res, next) => {
    try {
        const uploadedResults = []; // Array to store upload results

        // Read files from uploads directory synchronously
        const files = fs.readdirSync("uploads/");

        // Process each file asynchronously
        for (const file of files) {
            // Upload file to cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result) => {
                    if (error) {
                        reject(error); // Reject promise if upload fails
                    } else {
                        resolve(result); // Resolve promise with upload result
                    }
                });
            });

            uploadedResults.push(result); // Store upload result
            fs.removeSync(`uploads/${file}`); // Remove file after upload
        }

        // Send response after all files have been processed
        res.status(200).json({
            status: "success",
            message: "Images Uploaded",
            results: uploadedResults
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Images not Uploaded",
            error: error.message // Send error message in response
        });
    }
};