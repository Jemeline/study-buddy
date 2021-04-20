/* eslint-disable linebreak-style */
const mongoose = require("mongoose");
const {Majors, Minors, GraduatePrograms} = require("../utils/StudyPrograms.js");

const ProgramOfStudy = new mongoose.Schema({
  major: {
    type: [String],
    enum: Majors,
  },
  minor: {
    type: [String],
    enum: Minors,
  },
  graduateProgram: {
    type: [String],
    enum: GraduatePrograms,
  },
});

const StudentProfileSchema = new mongoose.Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  graduationYear: {
    type: Number,
    required: [true, "Graduation year required"],
    min: [2020, "Minimum graduation year is 2020"],
  },
  studentType: {
    type: String,
    required: [true, "Student type required"],
    lowercase: true,
    enum: ["undergraduate", "graduate"],
  },
  programOfStudy: {
    type: ProgramOfStudy,
    required: [true, "POS required"],
  },
  courseSchedule: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "StudentProfile",
    required: [true, "Course schedule required"],
  },
  learningType: {
    type: [String],
    lowercase: true,
    enum: ["verbal", "visual", "auditory/musical", "physical/kinaesthetic",
      "logical/mathematical", "social", "solitary", "prefer not to answer"],
    required: [true, "Learning type required"],
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
