const router = require("express").Router();
const { uploadFile, getSpecificUpload } = require("../controllers/upload");
const { authentication } = require("../middlewares/auth");

router.route("/").post(authentication, uploadFile);
router.route("/:id").get(authentication, getSpecificUpload);


module.exports = router;