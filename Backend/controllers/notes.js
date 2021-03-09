const asyncHandler = require("express-async-handler");

// PURPOSE: upload user
// TYPE: post
// FOR: for both admin and default
const uploadNote = asyncHandler(async (req, res) => {
  const dataArray = Object.keys(req.body);
  for (let data of dataArray) {
    if (data !== "reminder" && !req.body[data]) {
      res.status(400);
      throw new Error(`${data} required!`);
    }
  }

  req.user.notes.push(req.body);
  req.user = await req.user.save();
  return res.json({ message: "Note uploaded successfully!", notesData: req.user.notes });
});

// PURPOSE: delete note
// TYPE: delete
// FOR: for both admin and default
const deleteNote = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  req.user.notes = req.user.notes.filter((v) => v._id != req.params.id);
  await req.user.save();
  return res.json({ message: "Note deleted successfully!" });
});

module.exports = {
  deleteNote,
  uploadNote,
};
