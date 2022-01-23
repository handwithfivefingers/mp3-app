const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { checkUpload, createSongs } = require("../controller/music");

const router = express.Router();

// Create User
router.post("/upload/cloud",
//  requireSignin, 
 upload.none(), 
 checkUpload);
//login
router.post("/create-song", 
// requireSignin,
 upload.none(), 
 createSongs);
module.exports = router;
