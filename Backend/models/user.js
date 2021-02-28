const mongoose = require("mongoose");
const notifications = require("./notifications");

const userSchema = new mongoose.Schema(
  {
    gId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    college: String,
    degree: String,
    course: String,
    semester: String,
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploads",
      },
    ],
    notifications: [notifications],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    uploadsApproved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploads",
      },
    ],
    uploadsRejected: {
      type: Number,
      default: 0,
    },
    uploadsPending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploads",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Suspend"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
