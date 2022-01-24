const express = require("express");
const { upload, requireSignin } = require("../middleware/index");
const {
  checkUpload,
  createSongs,
  getSongs,
  searchSongs,
} = require("../controller/music");

const router = express.Router();

// Create User
router.post("/upload/cloud", requireSignin, upload.none(), checkUpload);
//login
router.post("/create-song", requireSignin, upload.none(), createSongs);

// fetch all Songs
router.post("/initial-data", getSongs);

router.post("/search", upload.none(), searchSongs);
module.exports = router;
