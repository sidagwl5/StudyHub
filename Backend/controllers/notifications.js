const e = require("express");
const asyncHandler = require("express-async-handler");
const users = require("../models/user");

// PURPOSE: delete specific notification
// TYPE: delete
// FOR: both admin and default
const deleteNotification = asyncHandler(async (req, res) => {
  let userData = null;
  if (req.body.userId) {
    userData = await users.findById(req.body.userId).select(["notifications"]);
    let index = userData.notifications.findIndex((v) => v._id == req.params.id);

    if (!userData.notifications[index].user.message) {
      userData.notifications.splice(index, 1);
    } 
    else userData.notifications[index].admin.message = "";
  } 
  else {
    userData = req.user;
    let index = userData.notifications.findIndex((v) => v._id == req.params.id);
    if (!userData.notifications[index].admin.message) {
      userData.notifications.splice(index, 1);
    } 
    else userData.notifications[index].user.message = "";
  }

  await userData.save();
  return res.status(200).end();
});

module.exports = { deleteNotification };
