const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    specificId: String,
    admin: {
      message: String,
      status: {
        type: String,
        enum: ["Pending", "Rejected", "Success", "Request"],
        default: "Pending",
      },
      path: String,
    },
    user: {
      message: String,
      status: {
        type: String,
        enum: ["Pending", "Rejected", "Success", "Request"],
        default: "Pending",
      },
      path: String,
    },
  },
  { timestamps: true }
);

module.exports = notificationSchema;
