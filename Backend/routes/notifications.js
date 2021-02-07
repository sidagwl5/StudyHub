const router = require("express").Router();
const { authentication } = require("../middlewares/auth");
const { getNotificationForSpecificUser, deleteNotification } = require("../controllers/notifications");

router.route("/getNotificationsForUser").get(authentication, getNotificationForSpecificUser);
router.route("/:id").delete(authentication, deleteNotification);


module.exports = router;