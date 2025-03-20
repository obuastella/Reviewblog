import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Remove file from local storage after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
