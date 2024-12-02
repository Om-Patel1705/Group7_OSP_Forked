const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const upload = require("../config/multer");
const pool = require("../config/db");

cloudinary.config({
  cloud_name: "ospproject7",
  api_key: "244546666616398",
  api_secret: "duDpcx6gsZ8jDO-8kku_1Vso5UY", // Use secure API keys in production
});

// Cloudinary upload function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw", // Automatically detect file type
    });

    console.log(response);

    fs.unlinkSync(localFilePath); // Remove the local file after upload
    return response.url; // Return Cloudinary URL
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

// Handle file upload
const handeluploads = async (req, res) => {
  const { email, key } = req.params;

  console.log("entered");
  console.log(key);

  const localFilePath = req.file ? req.file.path : null;

  if (!localFilePath) {
    return res.status(400).json({ message: "No file provided" });
  }

  const keyToDBColumnMap = {
    incomeCertificate: "income_certificate",
    bankPassbook: "bank_passbook",
    aadharcard: "aadhar_card",
    tuitionFeeReceipt: "tuition_fee_receipt",
    nonTuitionFeeReceipt: "non_tuition_fee_receipt",
    class10MarkSheet: "class_10_mark_sheet",
    class12MarkSheet: "class_12_mark_sheet",
    currentEducationMarkSheet: "current_education_mark_sheet",
  };
  const dbColumn = keyToDBColumnMap[key];

  try {
    const cloudinaryUrl = await uploadOnCloudinary(localFilePath);
    console.log(cloudinaryUrl);

    if (!cloudinaryUrl) {
      return res
        .status(500)
        .json({ message: "File upload to Cloudinary failed" });
    }

    const update = `
        INSERT INTO osp.applicant_documents (email, ${dbColumn})
        VALUES ($1, $2)
        ON CONFLICT (email) DO UPDATE
        SET ${dbColumn} = EXCLUDED.${dbColumn};
    `;

    console.log(email, cloudinaryUrl);

    try {
      const result = await pool.query(update, [email, cloudinaryUrl]);
      return res.status(200).json({
        message: "File uploaded successfully!",
        cloudinaryUrl,
      });
    } catch (err) {
      return res.status(500).json({ message: "Db failed to file url save" });
    }
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
};

module.exports = { handeluploads };
