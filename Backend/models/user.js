const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    gId: {
       type: String,
       required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    university: String,
    college: String,
    course: String,
    branch: String,
    semester: String,
    favourites: [String],
    uploads: [String],
    uploadsApproved: {
        type: Number,
        default: 0
    },
    uploadsRejected: {
        type: Number,
        default: 0
    },
    uploadsPending: {
        type: Number,
        default: 0
    },
    downloads: [String]

}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
