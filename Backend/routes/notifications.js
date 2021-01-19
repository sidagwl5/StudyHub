const router = require("express").Router();
const { uploadFile } = require("../controllers/upload");
const { authentication } = require("../middlewares/auth");
const { getNotificationForSpecificUser } = require("../controllers/notifications");

router.route("/getNotificationsForUser").get(authentication, getNotificationForSpecificUser);


module.exports = router;