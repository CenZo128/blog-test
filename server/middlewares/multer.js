const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloud config
cloudinary.config({
  cloud_name: "arman-bravo",
  api_key: "972227713417115",
  api_secret: "KA_zhqBCqBE2t6Q-lP09E5q8rsQ",
});

// storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "WLB-TEST",
  allowedFormats: ["jpg", "jpeg", "png", "svg"],
  filename: (req, files, cb) => {
    cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
  },
});

const uploader = multer({
  storage: storage,
});

module.exports = {uploader};