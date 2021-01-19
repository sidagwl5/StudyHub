const Notifications = require("../models/notifications");
const asyncHandler = require("express-async-handler");

const getNotificationForSpecificUser = asyncHandler(async (req, res) => {
  const userData = req.user;
  let notificationsData = await Notifications.find({
    uploaderId: userData._id,
  });

  notificationsData = notificationsData.map((v) => ({
    fileId: v.fileId,
    message: v.message.forUploader,
  }));

  return res.json(notificationsData);
});

module.exports = { getNotificationForSpecificUser };
