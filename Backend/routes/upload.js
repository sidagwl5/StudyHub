const router = require("express").Router();
const {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
  updateUpload,
  getFavouriteUploads,
  getLatestUploads,
  deleteUpload
} = require("../controllers/upload");
const authentication = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .post(authentication, uploadFile)
  .get(authentication, getAllFilesData);

router.route("/delete/:id").delete(authentication, deleteUpload);  

router
  .route("/:id")
  .get(authentication, getSpecificUpload)
  .delete(authentication, isAdmin, uploadReject)
  .post(authentication, isAdmin, uploadAccept)
  .patch(authentication, updateUpload);

router.route("/favourites/all").get(authentication, getFavouriteUploads);
router.route("/latest/all").get(authentication, getLatestUploads);  

module.exports = router;
