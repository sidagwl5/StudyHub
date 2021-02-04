const router = require("express").Router();
const { uploadFile, getSpecificUpload, getAllFilesData } = require("../controllers/upload");
const { authentication } = require("../middlewares/auth");

router.route("/").post(authentication, uploadFile).get(authentication, getAllFilesData);
router.route("/:id").get(authentication, getSpecificUpload);


module.exports = router;