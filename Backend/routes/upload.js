const router = require("express").Router();
const {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
  updateUpload,
  getFavouriteUploads
} = require("../controllers/upload");
const { authenticate } = require("../controllers/user");
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

module.exports = router;
