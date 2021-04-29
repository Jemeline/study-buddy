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
    type: [String],
    required: [true, "Courses required"],
  },
  first: {
    type: String,
    required: [true, "First name required"],
  },
  last: {
    type: String,
    required: [true, "Last name required"],
  },
  ratings: {
    type: [Number],
    required: [true, "Ratings required"],
  },
});

const AdvertisementModel = mongoose.model("Advertisement", advertisementSchema);
module.exports = AdvertisementModel;
