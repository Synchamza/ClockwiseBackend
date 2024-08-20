import express from "express";
import multer from "multer";
import { uploadImages } from "../Controllers/uploadController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "uploads/"); // Removed leading "/"
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1];
        console.log("file", file, uniqueSuffix);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Added "-" separator
    },
});

const upload = multer({ storage: storage });

const uploadRoute = express.Router();

//UPLOAD IMAGE ROUTE ====>

uploadRoute.post("/", upload.single("photo"), uploadImages);

// uploadRoute.post("/multipleImages", upload.array("images"), MultipleUploadImages);

export default uploadRoute;