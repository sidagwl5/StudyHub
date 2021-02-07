const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { getJwtToken } = require("../utils/helperFunctions");
const users = require("../models/user");
const { authentication } = require("../middlewares/auth");
const {
  logIn,
  authenticate,
  logOut,
  getAllUserDetails,
  deleteUser,
  updateUser,
  getSpecificUser,
  getSuccessfullUploads
} = require("../controllers/user");

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  asyncHandler(async (req, res) => {
    const { id: gId, name, photos } = req.user;
    let user = await users.findOne({ gId });

    if (!user) {
      let userData = {
        gId,
        name: `${name.givenName} ${name.familyName}`,
        imageUrl: photos[0].value,
      };

      user = await users.create(userData);
    }

    const token = getJwtToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:3000");
  })
);

router.route("/login").get(authentication, logIn);
router.route("/authenticate").get(authentication, authenticate);
router.route("/logout").get(authentication, logOut);
router.route("/all").get(authentication, getAllUserDetails);

router
  .route("/uploads")
  .get(authentication, getSuccessfullUploads);

router
  .route("/:id")
  .delete(authentication, deleteUser)
  .patch(authentication, updateUser)
  .get(authentication, getSpecificUser);



module.exports = router;
