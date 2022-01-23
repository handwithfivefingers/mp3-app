const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const {
  signUp,
    signIn,
  //   signOut,
  //   checkUser,
  //   findUser,
  //   addUsertoProject,
} = require("../controller/auth");

const router = express.Router();

// Create User
router.post("/register", upload.none(), signUp);
//login
router.post("/login", upload.none(), signIn);

module.exports = router;
