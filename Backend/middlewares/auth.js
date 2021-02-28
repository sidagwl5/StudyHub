const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const users = require("../models/user");
const { clearCookie } = require("../utils/helperFunctions");

const authentication = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    clearCookie(res, "User not authenticated");
  } else {
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    if (!userId) {
      clearCookie(res, "User not authenticated");
    }
 
    const userData = await users.findById(userId.id);
    if (!userData) {
      clearCookie(res, "User is not registered");
    } else if (userData.status === "Suspend") {
      clearCookie(res, "You are suspended by an admin!");
    }

    req.user = userData;
    next();
  }
});

module.exports = authentication;
