const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({

   uploaderId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Users',
       required: true
   },
   name: {
       type: String,
       required: true
   },
   description: String,
   url: {
       type: String,
       required: true
   },
   university: {
       type: String,
       required: true
   },
   college: {
       type: String,
       required: true
   },
   course: {
       type: String,
       required: true
   },
   branch: {
       type: String,
       required: true
   },
   semester: {
       type: String,
       required: true
   },
   type: {
       type: String,
       enum: ['Question Paper', 'Notes'],
       required: true
   },
   favourites: {
       type: String,
       default: 0
   }
}, { timestamps: true })


module.exports = mongoose.model('Uploads', uploadSchema);