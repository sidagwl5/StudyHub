const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    university: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Question Paper", "Notes"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Accepted", "Pending"],
      default: "Pending",
    },
    favourites: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Uploads", uploadSchema);
