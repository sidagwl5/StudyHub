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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationSchema);
