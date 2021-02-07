const router = require("express").Router();
const {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
} = require("../controllers/upload");
const { authentication } = require("../middlewares/auth");

router
  .route("/")
  .post(authentication, uploadFile)
  .get(authentication, getAllFilesData);

router
  .route("/:id")
  .get(authentication, getSpecificUpload)
  .delete(authentication, uploadReject)
  .post(authentication, uploadAccept);

module.exports = router;
