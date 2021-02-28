const router = require("express").Router();

const {
 getAllBlogs,
 getSpecificBlog,
 deleteBlog,
 likeBlog,
 uploadBlog
} = require("../controllers/blog");
const authentication = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .post(authentication, isAdmin, uploadBlog)
  .get(authentication, getAllBlogs);

router
  .route("/:id")
  .get(authentication, getSpecificBlog)
  .delete(authentication, isAdmin, deleteBlog)
  .patch(authentication, likeBlog);

module.exports = router;
