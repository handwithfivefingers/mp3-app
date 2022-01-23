const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const path = require("path");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const apiKey = "oOhO32uMsnxj4biMWhb9bU88SZc";
cloudinary.config({
  cloud_name: "dojswen0t",
  api_key: "776779258413574",
  api_secret: "oOhO32uMsnxj4biMWhb9bU88SZc",
});

const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      folder: "song_files",
    },
    apiKey
  );
  return { timestamp, signature };
};

exports.getSignCloud = async (req, res) => {
  // function handle token
  const sig = signuploadform();
  console.log(sig);
  res.status(200).json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: "dojswen0t",
    apikey: "776779258413574",
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage });

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "helloWorld");
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};
