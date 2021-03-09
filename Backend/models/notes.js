const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    reminder: {
        type: Date
    },
  },
  { timestamps: true }
);

module.exports = notesSchema;
