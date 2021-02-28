const blogs = require("../models/blog");
const asyncHandler = require("express-async-handler");
const users = require("../models/user");


// PURPOSE: get all blogs
// TYPE: get
// FOR: both admin and default
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogsData = await blogs
    .find({})
    .populate("uploaderId", ["imageUrl", "name"]);
  return res.json(blogsData);
});


// PURPOSE: upload blog
// TYPE: post
// FOR: admin
const uploadBlog = asyncHandler(async (req, res) => {
  const dataArray = Object.keys(req.body);

  for (let data of dataArray) {
    if (!req.body[data]) {
      res.status(400);
      throw new Error(`${data} required!`);
    }
  }

  await blogs.create({
    ...req.body,
    uploaderId: req.user._id,
  });
  return res.json({ message: "Blog uploaded successfully!" });
});


// PURPOSE: get specific blog
// TYPE: get
// FOR: both admin and default
const getSpecificBlog = asyncHandler(async (req, res) => {
  const blogsData = await blogs.findById(req.params.id);
  if (!blogsData) {
    res.status(400);
    throw new Error("No such blog post found!");
  }

  return res.json(blogsData);
});


// PURPOSE: like specific blog
// TYPE: put
// FOR: both admin and default
const likeBlog = asyncHandler(async (req, res) => {
  const blogsData = await blogs.findById(req.param.id);
  blogsData.likes.push(req.user._id);
  req.user.blogs.push(blogsData._id);

  blogsData = await req.user.save();
  req.user = await blogsData.save();
  return res.json({
    blogsData,
    userData: req.user,
  });
});


// PURPOSE: unlike specific blog
// TYPE: put
// FOR: both admin and default
const unlikeBlog = asyncHandler(async (req, res) => {
  const blogsData = await blogs.findById(req.param.id);
  blogsData.likes = blogsData.likes.filter((userId) => userId != req.user._id);
  req.user.blogs = req.user.blogs.filter((blogId) => blogId != blogsData._id);

  blogsData = await req.user.save();
  req.user = await blogsData.save();
  return res.json({
    blogsData,
    userData: req.user,
  });
});


// PURPOSE: delete specific blog
// TYPE: delete
// FOR: admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blogData = await blogs.findById(req.param.id);
  const allUsersBlogsData = await users.find({}).select(["blogs"]);

  for (let i = 0; i < allUsersBlogsData.length; i++) {
    const selectedBlogIdIndex = allUsersBlogsData[i].blogs.findIndex(
      (blogId) => blogId == req.params.id
    );
    if (selectedBlogId !== -1) {
      allUsersBlogsData[i].blogs.splice(selectedBlogIdIndex, 1);
      await allUsersBlogsData[i].save();
    }
  }

  await blogData.delete();
  return res.json({ message: "Blog deleted successfully!" });
});

module.exports = {
  deleteBlog,
  getSpecificBlog,
  uploadBlog,
  getAllBlogs,
  likeBlog,
  unlikeBlog,
};
