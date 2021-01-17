const asyncHandler = require("express-async-handler");
const uploads = require("../models/upload");
const path = require("path");

const uploadFile = asyncHandler(async (req, res) => {
  let fileData = req.body;
  let fileKeys = [
    "description",
    "name",
    "college",
    "university",
    "branch",
    "course",
    "type",
    "userId",
  ];
  let check = fileKeys.find(v => v !== 'description' && !fileData[v])

  console.log(check);

  if (check) {
    res.status(400);
    throw new Error("All details not filled");
  }

  const { file } = req.files;

  file.mv(
    path.join(__dirname, `../../frontend/public/uploads/${file.name}`),
    async (err) => {
      if (err) {
        res.status(500);
        throw new Error("Error in uploading file, please try again later!");
      }

      try {
        let fileData = {
          name,
          description,
          url,
          university,
          college,
          course,
          branch,
          semester,
          type,
          path: `/public/uploads/${file.name}`,
        };

        await uploads.create(fileData);

        res.json({ message: "File uploaded succesfully" });
      } catch (error) {
        res.status(400);
        res.send(error.message);
      }
    }
  );
});

module.exports = { uploadFile };
