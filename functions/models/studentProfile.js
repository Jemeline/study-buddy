const mongoose = require("mongoose");
const StudyPrograms = require("../utils/StudyPrograms.js");

const StudentProfileSchema = new mongoose.Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  graduationYear: {
    type: Number,
    required: [true, "Graduation year required"],
    min: [2020, "Minimum graduation year is 2020"],
  },
  studentType: {
    type: String,
    required: [true, "Student Type required"],
    lowercase: true,
    enum: ["undergraduate", "graduate"],
  },
  major: {
    type: [String],
    required: [true, "Major required"],
    enum: StudyPrograms,
  },
  classSchedule: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "StudentProfile",
  },
  learningType: {
    type: [String],
    lowercase: true,
    enum: ["verbal", "visual", "auditory/musical", "physical/kinaesthetic",
      "logical/mathematical", "social", "solitary", "prefer not to answer"],
  },
  residencelLocation: {
    type: String,
    lowercase: true,
    enum: ["on-campus", "off-campus", "remote", "prefer not to answer"],
  },
  studyLocation: {
    type: [String],
    lowercase: true,
  },
  identifiers: {
    type: [String],
    lowercase: true,
  },
  matchingPreferences: {
    type: String,
    lowercase: true,
  },
});

const StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);
module.exports = StudentProfile;
