const mongoose = require("mongoose");


const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    songNameEn: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    duration: {
      type: String,
    },
    tag: [
      {
        type: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
