const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// check extension
function isFileTypeSupported(supportedTypes, fileType) {
  return supportedTypes.includes(fileType);
}

// Upload file to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder, // Cloudinary folder name
    public_id: file.name.split(".")[0], // use filename as public_id
    resource_type: "auto",
  };

  if (quality) {
    options.quality = quality;
  }

  // Upload file using Cloudinary SDK
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// ----------------------------------------


//  Exported main function
exports.imageUpload = async (file, folder, quality) => {
  try {
    // --- Basic validations ---
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    if (!file.name || !file.name.includes(".")) {
      throw new Error("Invalid file name. File must have an extension.");
    }

    // --- File type validation ---
    const supportedTypes = [
      "jpg", "jpeg", "png", "gif", "bmp", "webp",
      "svg", "tiff", "tif", "heic", "heif", "avif",
      "raw", "ico"
    ];

    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(supportedTypes, fileType)) {
      throw new Error(`.${fileType} files are not supported. Allowed: ${supportedTypes.join(", ")}`);
    }

    // --- Upload file ---
    const response = await uploadFileToCloudinary(file, folder, quality);

    return response; // Cloudinary response object (with secure_url, public_id, etc.)

  } catch (error) {
    throw new Error(error.message || "Failed to upload image to Cloudinary.");
  }
};


// ----------------------------------------

//  Exported main function
exports.videoUpload = async (file, folder, quality) => {
  try {
    // --- Basic validations ---
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    if (!file.name || !file.name.includes(".")) {
      throw new Error("Invalid file name. File must have an extension.");
    }

    // --- File type validation ---
    const supportedTypes = [
       "mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "mpeg", "mpg", "3gp", "m4v"
    ];

    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(supportedTypes, fileType)) {
      throw new Error(`.${fileType} files are not supported. Allowed: ${supportedTypes.join(", ")}`);
    }

    // --- Upload file ---
    const response = await uploadFileToCloudinary(file, folder, quality);

    return response; // Cloudinary response object (with secure_url, public_id, etc.)
    
  } catch (error) {
    throw new Error(error.message || "Failed to upload image to Cloudinary.");
  }
};