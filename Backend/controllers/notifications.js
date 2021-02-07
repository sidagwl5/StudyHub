const Notifications = require("../models/notifications");
const asyncHandler = require("express-async-handler");
const notifications = require("../models/notifications");

const mapper = {
  Rejected: "Your request has been rejected by admin!",
  Pending: "Your request has been sent to admin for review!",
  Approved: "Your request has been approved by admin!",
};

const getNotificationForSpecificUser = asyncHandler(async (req, res) => {
  const userData = req.user;

  let notificationsData = [];
  if (userData.isAdmin) {
    notificationsData = await Notifications.find({ status: "Pending" });
  } else {
    notificationsData = await Notifications.find({
      uploaderId: userData._id,
    }).select(["-uploaderId", "-message"]);

    notificationsData = notificationsData.map((v) => ({
      ...v['_doc'],
      message: mapper[v.status],
    }));
  }

  return res.json(notificationsData);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notificationData = await notifications.findById(req.params.id);

  if (
    notificationData.status === "Rejected" ||
    notificationData.status === "Approved"
  ) {
    await notificationData.delete();
  }

  return res.status(200).end();
});

module.exports = { getNotificationForSpecificUser, deleteNotification };