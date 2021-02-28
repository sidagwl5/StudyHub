const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("You do not have priviledges to access this content");
  }

  next();
});

module.exports = isAdmin;