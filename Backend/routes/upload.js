const router = require("express").Router();
const {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
  updateUpload,
  getFavouriteUploads,
  getLatestUploads
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
  .post(authentication, uploadAccept)
  .patch(authentication, updateUpload);

router.route("/favourites/all").get(authentication, getFavouriteUploads);
router.route("/latest/all").get(authentication, getLatestUploads);  

module.exports = router;
