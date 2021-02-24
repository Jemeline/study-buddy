const mongoose = require("mongoose");

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
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
