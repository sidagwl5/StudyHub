const router = require("express").Router();

const {
 deleteNote,
 uploadNote
} = require("../controllers/notes");
const authentication = require("../middlewares/auth");

router
  .route("/")
  .post(authentication, uploadNote)

router
  .route("/:id")
  .delete(authentication, deleteNote)

module.exports = router;
