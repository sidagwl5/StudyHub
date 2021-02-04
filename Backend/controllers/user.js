const users = require("../models/user");
const notifications = require("../models/notifications");
const uploads = require("../models/upload");
const asyncHandler = require("express-async-handler");

const logIn = asyncHandler((req, res) => {
  const data = {
    firstName: req.user.firstName,
    imageUrl: req.user.imageUrl,
    isAdmin: req.user.isAdmin,
  };

  return res.json(data);
});

const logOut = asyncHandler((req, res) => {
  res.clearCookie("token");
  return res.status(200).end();
});

const authenticate = asyncHandler((req, res) => {
  return res.status(200).end();
});

const getAllUserDetails = asyncHandler(async (req, res) => {
  const usersData = await users.find({ isAdmin: false });
  return res.json(usersData);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userData = await users.findByIdAndDelete(req.params.id);
  await notifications.deleteMany({ uploaderId: userData._id });
  await uploads.deleteMany({ uploaderId: userData._id });
  return res.json({
    message: `User with name ${userData.firstName} deleted Successfully!`,
  });
});

const assignAdminRole = asyncHandler(async (req, res) => {
  const usersData = await users.findById(req.params.id);
  usersData.isAdmin = true;

  await usersData.save();
  return res.json({
    message: `user with name ${usersData.firstName} assigned admin role successfully!`,
  });
});

module.exports = { logIn, logOut, authenticate, getAllUserDetails, deleteUser, assignAdminRole };
