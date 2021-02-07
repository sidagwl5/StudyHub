const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const users = require("../models/user");

const authentication = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("User not authenticated");
  } 
  
  else {
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    if (!userId) {
      res.clearCookie("token");
      res.status(401);
      throw new Error("User not authenticated");
    }

    const userData = await users.findById(userId.id);
    if (!userData) {
      res.clearCookie("token");
      res.status(401);
      throw new Error("User is not registered");
    }

    else if(userData.status === 'Suspend'){
      res.clearCookie("token");
      res.status(401);
      throw new Error("You are suspended by an admin!");
    }

    req.user = userData;
    next();
  }
});

module.exports = { authentication };
