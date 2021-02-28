const router = require("express").Router();
const authentication = require("../middlewares/auth");
const { deleteNotification } = require("../controllers/notifications");

router.route("/:id").post(authentication, deleteNotification);


module.exports = router;