const router = require("express").Router();
const { uploadFile } = require("../controllers/upload");
const { authentication } = require("../middlewares/auth");

router.route("/").post(authentication, uploadFile);


module.exports = router;