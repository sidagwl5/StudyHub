const jwt = require("jsonwebtoken");

const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const clearCookie = (res, msg) => {
  res.clearCookie("token");
  res.status(401);
  throw new Error(msg);
};

module.exports = { getJwtToken, clearCookie };
