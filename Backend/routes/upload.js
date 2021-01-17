const router = require("express").Router();
const { uploadFile } = require("../controllers/upload");

router.route("/").post(uploadFile);


module.exports = router;