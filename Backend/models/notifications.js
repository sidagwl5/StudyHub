const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uploads",
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Rejected', 'Approved'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationSchema);
