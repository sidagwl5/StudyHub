const blogs = require("../models/blog");
const asyncHandler = require("express-async-handler");


export const getAllBlogs = asyncHandler(async (req, res) => {
   const blogsData = await blogs.find({});
   return res.json(blogsData);
})


export const uploadBlog = asyncHandler(async, (req, res) => {

    const dataArray = Object.keys(req.body);

    for(let data of dataArray){
         if(!req.body[data]){
             res.status(400);
             throw new Error(`${data} required!`);
         }
    }

    await blogs.create({
        ...req.body,
        uploaderId: req.user._id
    })

    return res.json({ message: 'Blog uploaded successfully!' });
})


export const getSpecificBlog = asyncHandler(async (req, res) => {
    const blogsData = await blogs.findById(req.params.id);
    if(!blogsData){
       res.status(400); 
       throw new Error('No such blog post found!');
    }
    
    return res.json(blogsData);
 })


export const likeBlog = asyncHandler(async (req, res) => {
    const blogsData = await blogs.findById(req.param.id);
    blogsData.likes = blogsData.likes.push(req.body.userId);

    await blogsData.save();
    return res.json(blogsData);
})


export const deleteBlog = asyncHandler(async (req, res) => {
    
    await blogs.findByIdAndDelete(req.param.id);
    return res.json({ message: 'Blog deleted successfully!' });
})

 

