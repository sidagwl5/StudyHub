const asyncHandler = require("express-async-handler");
const path = require("path");

const uploads = require("../models/upload");
const notifications = require("../models/notifications");

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
    throw new Error("All details neec to be filled!");
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
    path.join(__dirname, `../../frontend/public/uploads/${file.name}`),
    async (err) => {
      if (err) {
        await uploads.findByIdAndRemove(fileUploadedData._id);
        res.status(500);
        throw new Error("Error in uploading file, please try again later!");
      }

      try {
        fileUploadedData.url = `/public/uploads/${file.name}`;
        await fileUploadedData.save();

        const { uploadsPending, _id, firstName, lastName } = userData;

        userData.uploadsPending = uploadsPending + 1;
        userData = await userData.save();

        await notifications.create({
          uploaderId: _id,
          fileId: fileUploadedData._id,
          message: {
            forAdmin: `${firstName} ${lastName} has uploaded a new file`,
            forUploader: "Your file is pending for review by admin",
          },
        });

        console.log("done");
        return res.json({ message: "File has been sent to admin for review" });
      } catch (error) {
        await uploads.findByIdAndRemove(fileUploadedData._id);
        console.log(error);
        res.status(400);
        res.send(error.message);
      }
    }
  );
});

const getSpecificUpload = asyncHandler(async (req, res) => {
  const uploadId = req.params.id;
  const uploadData = await uploads.findById(uploadId);
  console.log(uploadData);

  res.json(uploadData);
});

const getAllFilesData = asyncHandler(async (req, res) => {
  const allFilesData = await uploads.find({})
                       .populate("uploaderId", ['imageUrl', 'firstName'])
                       .select(['status', 'name', 'description', 'university', 'college', 'type']);

  console.log(allFilesData);
  return res.json(allFilesData);
});

module.exports = { uploadFile, getSpecificUpload, getAllFilesData };
