/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Mongoose data schema for StudentProfile object.
The StudentProfile object is populated once a student completes the Study Buddy
survey and contains detailed student study preferences. A StudentProfile is linked
to a User by the unique _userId field.
For detailed data definitions: https://docs.google.com/document/d/14qkdYCDylZk62Gv6M04fyYsa7VxupBWX4OhFtDWyD-M/edit?usp=sharing
*/
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

const subCourseSemester = new mongoose.Schema({
  year: {
    type: Number,
    required: [true, "Year required"],
    min: [2021, "Minimum year is 2021"],
  },
  season: {
    type: String,
    uppercase: true,
    trim: true,
    enum: ["SPRING", "FALL"],
    required: [true, "Season required"],
  },
});

const subCourseSchedule = new mongoose.Schema({
  day: {
    type: String,
    required: [true, "Day required"],
    uppercase: true,
    trim: true,
  },
  time: {
    type: String,
    required: [true, "Time required"],
  },
});

const CourseSchema = new mongoose.Schema({
  courseSemester: {
    type: subCourseSemester,
    required: [true, "Course semester required"],
  },
  courseSubject: {
    type: String,
    required: [true, "Course subject required"],
    trim: true,
    uppercase: true,
  },
  courseTitle: {
    type: String,
    required: [true, "Course title required"],
    uppercase: true,
  },
  courseType: {
    type: String,
    required: [true, "Course type required"],
    uppercase: true,
  },
  courseNumber: {
    type: Number,
    required: [true, "Course number required"],
  },
  courseSection: {
    type: Number,
    required: [true, "Course section required"],
  },
  courseSchedule: {
    type: [subCourseSchedule],
    required: [true, "Course schedule required"],
  },
  courseInstructor: {
    type: [String],
    required: [true, "Course instructor required"],
    uppercase: true,
  },
  courseIsHonors: {
    type: Boolean,
    required: [true, "Course isHonors required"],
  },
  courseIsLab: {
    type: Boolean,
    required: [true, "Course isLab required"],
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
  courseScheduleImproved: {
    type: [CourseSchema],
  },
});

const StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);
module.exports = StudentProfile;
