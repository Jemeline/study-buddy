/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  tutorEmail: {
    type: String,
    required: [true, "Tutor Email required"],
  },
  text: {
    type: String,
    required: [true, "Text required"],
  },
  courses: {
    type: String,
    required: [true, "Courses required"],
  },
});

const AdvertisementModel = mongoose.model("Advertisement", advertisementSchema);
module.exports = AdvertisementModel;
