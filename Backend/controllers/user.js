const users = require("../models/user");
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
  const usersData = await users.find({});
  console.log(usersData);
  return res.json(usersData);
});

module.exports = { logIn, logOut, authenticate, getAllUserDetails };
