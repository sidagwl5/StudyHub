const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("You do not have priviledges to access this content");
  }

  next();
});
