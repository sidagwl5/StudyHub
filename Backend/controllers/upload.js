const asyncHandler = require("express-async-handler");
const path = require("path");

const uploads = require("../models/upload");
const notifications = require("../models/notifications");
const user = require("../models/user");


// PURPOSE: upload a file
// TYPE: post
// FOR: default
const uploadFile = asyncHandler(async (req, res) => {
  let dataArray = [
    "description",
    "name",
    "university",
    "college",
    "degree",
    "course",
    "type",
    "semester",
  ];

  let check = dataArray.find((v) => v !== "description" && !req.body[v]);

  if (check) {
    res.status(400);
    throw new Error("All details need to be filled!");
  }

  let fileData = {};
  dataArray.forEach((v) => {
    fileData[v] = req.body[v] || "";
  });

  let userData = req.user;
  fileData["uploaderId"] = userData._id;

  let fileUploadedData = await uploads.create(fileData);
  const { file } = req.files;

  file.mv(
    path.join(__dirname, `../../frontend/src/resources/files/${file.name}`),
    async (err) => {
      if (err) {
        await uploads.findByIdAndRemove(fileUploadedData._id);
        res.status(500);
        throw new Error("Error in uploading file, please try again later!");
      }

      try {
        fileUploadedData.url = `/files/${file.name}`;
        await fileUploadedData.save();

        const notificationData = await notifications.create({
          uploaderId: userData._id,
          fileId: fileUploadedData._id,
          message:  `${userData.name} has uploaded a new file`,
        });

        try {
          userData.uploadsPending.push(fileUploadedData._id);
          await userData.save();
          return res.json({
            message: "File has been sent to admin for review",
          });
        } catch (error) {
          await notifications.findByIdAndRemove(notificationData._id);
          throw error;
        }
      } catch (error) {
        await uploads.findByIdAndRemove(fileUploadedData._id);
        console.log(error);
        res.status(400);
        res.send(error.message);
      }
    }
  );
});


// PURPOSE: get specific file data
// TYPE: get
// FOR: both
const getSpecificUpload = asyncHandler(async (req, res) => {
  const uploadId = req.params.id;
  let uploadData = null;

  if (req.user.isAdmin) {
    uploadData = await uploads
      .findById(uploadId)
      .populate("uploaderId", ["imageUrl", "name"]);
  } 
  else uploadData = await uploads.findById(uploadId);

  res.json(uploadData);
});


// PURPOSE: all files data
// TYPE: get
// FOR: admin 
const getAllFilesData = asyncHandler(async (req, res) => {
  const allFilesData = await uploads
    .find({})
    .populate("uploaderId", ["imageUrl", "name"]);

  return res.json(allFilesData);
});


// PURPOSE: upload request rejected
// TYPE: delete
// FOR: admin
const uploadReject = asyncHandler(async (req, res) => {
  const notificationData = await notifications.findOne({
    fileId: req.params.id,
  });

  notificationData.fileId = null;
  notificationData.status = "Rejected";
  await notificationData.save();


  const userData = await user.findById(notificationData.uploaderId);
  userData.uploadsRejected = userData.uploadsRejected + 1;
  userData.uploadsPending = userData.uploadsPending.filter(v => v != req.params.id);
  await userData.save();

  await uploads.findByIdAndDelete(req.params.id);

  return res.json({ message: "Upload has been rejected!" });
});

// PURPOSE: upload request accepted
// TYPE: post
// FOR: admin
const uploadAccept = asyncHandler(async (req, res) => {
  
  const notificationData = await notifications.findOne({
    fileId: req.params.id,
  });

  notificationData.fileId = null;
  notificationData.status = 'Approved';
  await notificationData.save();

  const fileData = await uploads.findById(req.params.id);
  fileData.status = 'Accepted';
  await fileData.save();

  const userData = await user.findById(fileData.uploaderId);
  userData.uploadsPending = userData.uploadsPending.filter(v => v != req.params.id);
  userData.uploadsApproved.push(req.params.id);
  await userData.save();

  return res.json({ message: "Upload has been approved!" });
});

// PURPOSE: like a post
// TYPE: patch
// FOR: both
const updateUpload = asyncHandler(async (req, res) => {
  
  const {type, ...rest} = req.body;
  await uploads.findByIdAndUpdate(req.params.id, rest);

  const userData = req.user;
  if(type === 'addToFavourites'){
  userData.favourites.push(req.params.id);
  }
  else if(type === 'removeFromFavourites'){
    userData.favourites = userData.favourites.filter(v => v != req.params.id);
  }
  await userData.save();

  return res.status(200).end();
});

// PURPOSE: delete upload
// TYPE: delete
// FOR: both

const deleteUpload = asyncHandler(async (req, res) => {
  
  const {type, ...rest} = req.body;
  await notifications.findOneAndDelete(req.params.id);

  const uploadData = await uploads.findById(req.params.id);
  const userData = await uploads.findById(req.body.userId);

  if(uploadData.status === 'Pending'){
    userData.uploadsPending = userData.uploadsPending.filter(v => v != req.params.id);
  }
  else {
    userData.uploadsApproved = userData.uploadsApproved.filter(v => v != req.params.id);
  }
  await userData.save();
  await uploadData.delete();

  return res.status(200).end();
});

const getFavouriteUploads = asyncHandler(async (req, res) => {
  const uploadsData = await uploads.find({}).sort({ favourites: -1 }).limit(10);
  return res.json(uploadsData);
})


module.exports = {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
  updateUpload,
  getFavouriteUploads
};
