const asyncHandler = require("express-async-handler");
const path = require("path");

const uploads = require("../models/upload");
const notifications = require("../models/notifications");
const user = require("../models/user");

// PURPOSE: upload a file
// TYPE: post
// FOR: default
const uploadFile = asyncHandler(async (req, res) => {
  let keysArray = Object.keys(req.body);
  let check = keysArray.find((v) => v !== "description" && !req.body[v]);

  if (check) {
    res.status(400);
    throw new Error(`${check} need to be filled!`);
  }

  let fileData = req.body;
  fileData["uploaderId"] = req.user._id;

  let fileUploadedData = new uploads(fileData);
  const { file } = req.files;

  file.mv(
    path.join(__dirname, `../../frontend/src/resources/files/${file.name}`),
    async (err) => {
      if (err) {
        res.status(500);
        throw new Error("Error in uploading file, please try again later!");
      }

      try {
        fileUploadedData.url = `/files/${file.name}`;
        fileUploadedData = await fileUploadedData.save();

        fileUploadedData = await uploads.populate(fileUploadedData, {
          path: "uploaderId",
          select: ["imageUrl", "name"],
        });

        try {
          req.user.uploadsPending.push(fileUploadedData._id);
          const notificationData = {
            specificId: fileUploadedData._id,
            admin: {
              message: `${req.user.name} has uploaded a new file`,
              path: `/review/${fileUploadedData._id}`,
            },
            user: {
              message: `Your upload request has been sent to admin!`,
              status: "Success",
              path: `/uploadhub/${fileUploadedData._id}`,
            },
          };

          req.user.notifications.push(notificationData);
          const userData = await req.user.save();
          return res.json({
            message: "File has been sent to admin for review",
            fileData: fileUploadedData,
            notificationsData: userData.notifications.reduce((prev, current) => {    
                if(current.user.message){
                  prev.push({
                    data: current.user,
                    id: current._id,
                    specificId: current.specificId
                  })
                }
                return prev;
              }, [])
          });
        } catch (error) {
          await notifications.findByIdAndRemove(notificationData._id);
          throw error;
        }
      } 
      
      catch (error) {
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
  let uploadData = await uploads
    .findById(req.params.id)
    .populate("uploaderId", ["imageUrl", "name"]);

  res.json(uploadData);
});


// PURPOSE: get all files data
// TYPE: get
// FOR: for both admin and default
const getAllFilesData = asyncHandler(async (req, res) => {
  const allFilesData = await uploads
    .find({})
    .populate("uploaderId", ["imageUrl", "name"])
    .select([
      "college",
      "status",
      "type",
      "url",
      "favourites",
      "name",
      "createdAt",
    ]);

  return res.json(allFilesData);
});


// PURPOSE: upload request rejected
// TYPE: delete
// FOR: admin
const uploadReject = asyncHandler(async (req, res) => {
  
  const fileData = await uploads.findById(req.params.id);

  const userData = await user.findById(fileData.uploaderId);
  userData.uploadsRejected = userData.uploadsRejected + 1;
  userData.uploadsPending = userData.uploadsPending.filter(
    (v) => v != req.params.id
  );

  const notification = userData.notifications.find(v => v.specificId == req.params.id);
  notification.user = {
    message: "Your upload has been rejected by admin!",
    status: "Rejected",
    path: ""
  }
  notification.admin = {
    message: "You have rejected the upload of user siddharth Agrawal!",
    status: "Success",
    path: ""
  }

  await userData.save();
  await fileData.delete();
  return res.json({ 
  message: "Upload has been rejected!",  
  notificationData: {
    specificId: null,
    data: notification.admin,
    id: notification._id,
    userId: userData._id
  } });
});


// PURPOSE: upload request accepted
// TYPE: post
// FOR: admin
const uploadAccept = asyncHandler(async (req, res) => {

  const fileData = await uploads.findById(req.params.id);
  fileData.status = "Accepted";
  await fileData.save();

  const userData = await user.findById(fileData.uploaderId);
  userData.uploadsPending = userData.uploadsPending.filter(
    (v) => v != req.params.id
  );
  userData.uploadsApproved.push(req.params.id);

  const notification = userData.notifications.find(v => v.specificId == req.params.id);
  notification.user = {
    message: "Your upload has been accepted by admin!",
    status: "Success",
    path: ""
  }
  notification.admin = {
    message: `You have accepted the upload of user ${userData.name}!`,
    status: "Success",
    path: ""
  }

  await userData.save();
  return res.json({ 
    message: "Upload has been approved!",
    notificationData: {
      specificId: notification.specificId,
      data: notification.admin,
      id: notification._id,
      userId: userData._id
    } });
});


// PURPOSE: favourite an upload
// TYPE: patch
// FOR: default
const updateUpload = asyncHandler(async (req, res) => {
  const { type, ...rest } = req.body;
  await uploads.findByIdAndUpdate(req.params.id, rest);

  const userData = req.user;
  if (type === "addToFavourites") {
    userData.favourites.push(req.params.id);
  } else if (type === "removeFromFavourites") {
    userData.favourites = userData.favourites.filter((v) => v != req.params.id);
  }
  await userData.save();

  return res.status(200).end();
});


// PURPOSE: delete upload
// TYPE: delete
// FOR: both
const deleteUpload = asyncHandler(async (req, res) => {

  console.log(req.params.id);
  const uploadData = await uploads.findById(req.params.id);
  const userData = await user.findById(uploadData.uploaderId);

  if (uploadData.status === "Pending") {
    userData.uploadsPending = userData.uploadsPending.filter(
      (v) => v != req.params.id
    );
  } 
  else {
    const usersfavouritesData = await user.find({}).select(["favourites"]);
    for (let i = 0; i < usersfavouritesData.length; i++) {
      const index = usersfavouritesData[i].favourites.findIndex(
        (uploadId) => uploadId == req.params.id
      );
      if (index !== -1) {
        usersfavouritesData[i].favourites.splice(index, 1);
        await usersfavouritesData[i].save();
      }
    }
  
    userData.uploadsApproved = userData.uploadsApproved.filter(
      (v) => v != req.params.id
    );
  }

  userData.notifications = userData.notifications
  .filter(notificationData  => notificationData.specificId != req.params.id);

  await userData.save();
  await uploadData.delete();
  return res.status(200).json({
    message: 'Upload deleted succesfully!'
  });
});


// PURPOSE: get top favourite uploads
// TYPE: get
// FOR: default
const getFavouriteUploads = asyncHandler(async (req, res) => {
  const uploadsData = await uploads
    .find({})
    .populate("uploaderId", ["imageUrl"])
    .select([
      "college",
      "status",
      "type",
      "url",
      "favourites",
      "name",
      "createdAt",
    ])
    .sort({ favourites: -1 })
    .limit(10);
  return res.json(uploadsData);
});


// PURPOSE: get latest uploads
// TYPE: get
// FOR: default
const getLatestUploads = asyncHandler(async (req, res) => {
  const uploadsData = await uploads
    .find({})
    .populate("uploaderId", ["imageUrl"])
    .select([
      "college",
      "status",
      "type",
      "url",
      "favourites",
      "name",
      "createdAt",
    ])
    .sort({ createdAt: -1 })
    .limit(10);
  return res.json(uploadsData);
});

module.exports = {
  uploadFile,
  getSpecificUpload,
  getAllFilesData,
  uploadReject,
  uploadAccept,
  updateUpload,
  getFavouriteUploads,
  getLatestUploads,
  deleteUpload
};
