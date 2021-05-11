/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Mongoose data schema for Course object. Spring 2021 course data was
generated using a Python script I wrote for scraping data from the UNC Directory of Classes
(https://registrar.unc.edu/courses/schedule-of-classes/directory-of-classes-2/). For
more information on how this data was obtained follow this link:
https://docs.google.com/document/d/1j9W9lk225A2ydWczMFYD_5W9FBFmkEBsl6PDjCizAqE/edit?usp=sharing
For detailed data definitions: https://docs.google.com/document/d/14qkdYCDylZk62Gv6M04fyYsa7VxupBWX4OhFtDWyD-M/edit?usp=sharing
*/

const mongoose = require("mongoose");

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
    type: String,
    required: [true, "Course semester required"],
    uppercase: true,
  },
  courseYear: {
    type: Number,
    required: [true, "Course year required"],
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

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
