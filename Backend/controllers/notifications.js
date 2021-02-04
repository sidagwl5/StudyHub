const Notifications = require("../models/notifications");
const asyncHandler = require("express-async-handler");
const notifications = require("../models/notifications");

const getNotificationForSpecificUser = asyncHandler(async (req, res) => {
  const userData = req.user;
  
  let notificationsData = null;
  if(userData.isAdmin){
    notificationsData = await Notifications.find({});
    notificationsData = notificationsData.map((v) => ({
      fileId: v.fileId,
      message: v.message.forAdmin,
      status: v.status
    }));
  }
  
  else{
    notificationsData = await Notifications.find({
      uploaderId: userData._id,
    });
  
    notificationsData = notificationsData.map((v) => ({
      fileId: v.fileId,
      message: v.message.forUploader,
      status: v.status
    }));
  }

  return res.json(notificationsData);
});

module.exports = { getNotificationForSpecificUser };
