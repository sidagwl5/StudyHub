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
      required: true,
      ref: "Uploads",
    },
    message: {
      forAdmin: {
        type: "String",
        required: true,
      },
      forUploader: {
        type: "String",
        required: true,
      },
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
