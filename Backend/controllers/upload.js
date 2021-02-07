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
    "course",
    "branch",
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

  delete notificationData.fileId;
  notificationData.status = "Rejected";
  await notificationData.save();

  await uploads.findByIdAndDelete(req.params.id);

  const userData = await user.findById(notificationData.uploaderId);
  userData.uploadsRejected = userData.uploadsRejected + 1;
  await userData.save();

  return res.json({ message: "Upload has been rejected!" });
});

// PURPOSE: upload request accepted
// TYPE: post
// FOR: admin
const uploadAccept = asyncHandler(async (req, res) => {
  
  console.log(req.params.id)
  const notificationData = await notifications.findOne({
    fileId: req.params.id,
  });

  console.log(notificationData);

  delete notificationData.fileId;
  notificationData.status = 'Approved';
  await notificationData.save();

  const fileData = await uploads.findById(req.params.id);
  fileData.status = 'Accepted';
  await fileData.save();

  const userData = await user.findById(fileData.uploaderId);
  userData.uploadsPending = userData.uploadsPending.filter(v => v !== req.params.id);
  userData.uploadsApproved.push(req.params.id);
  await userData.save();

  return res.json({ message: "Upload has been approved!" });
});

module.exports = {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept
};
