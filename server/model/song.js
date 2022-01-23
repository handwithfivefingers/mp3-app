const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const songSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   unique: true,
    //   index: true,
    //   lowercase: true,
    // },
    // hash_password: {
    //   type: String,
    //   required: true,
    // },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
    songName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
