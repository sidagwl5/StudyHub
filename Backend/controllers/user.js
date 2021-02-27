const users = require("../models/user");
const notifications = require("../models/notifications");
const uploads = require("../models/upload");
const asyncHandler = require("express-async-handler");

const logIn = asyncHandler((req, res) => {
  const data = {
    name: req.user.name,
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
  return res.json(req.user);
});

const getAllUserDetails = asyncHandler(async (req, res) => {
  const usersData = await users
    .find({ isAdmin: false })
    .select(["name", "imageUrl"]);
  return res.json(usersData);
});

const deleteUser = asyncHandler(async (req, res) => {
  await notifications.deleteMany({ uploaderId: req.params.id });
  await uploads.deleteMany({ uploaderId: req.params.id });
  await users.findByIdAndDelete(req.params.id);
  return res.json({
    message: `User deleted Successfully!`,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  await users.findByIdAndUpdate(req.params.id, req.body);
  return res.json({
    message: `User updated successfully!`,
  });
});

const getSpecificUser = asyncHandler(async (req, res) => {
  const usersData = await users.findById(req.params.id);
  return res.json(usersData);
});

const adminRoleRequest = asyncHandler(async (req, res) => {
  await notifications.create({
    uploaderId: req.user._id,
    message: `${req.user.name} has requested for admin role!`,
    status: "Request",
  });

  return res.json({ message: 'Your request has been sent successfully!' });
});

module.exports = {
  logIn,
  logOut,
  authenticate,
  getAllUserDetails,
  deleteUser,
  updateUser,
  getSpecificUser,
  adminRoleRequest
};
