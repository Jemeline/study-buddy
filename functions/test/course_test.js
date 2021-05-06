/* eslint-disable max-len */
/* eslint-disable no-undef */
const assert = require("assert");
const CourseModel = require("../models/course");

afterEach(() => {
  CourseModel.findOneAndRemove({courseTitle: "COURSE UNIT TEST"}).then(() => done());
});

describe("Creating course", () => {
  it("creates a course", (done) => {
    const course = new CourseModel({
      courseSemester: {
        year: 2022,
        season: "FALL",
      },
      courseSubject: "TEST",
      courseTitle: "COURSE UNIT TEST",
      courseType: "LECTURE",
      courseNumber: 111,
      courseSection: 333,
      courseSchedule: [
        {
          day: "TUTH",
          time: "15:30 - 16:45",
        },
      ],
      courseInstructor: [
        "TEST",
      ],
      courseIsHonors: false,
      courseIsLab: false,
    });
    course.save()
        .then(() => {
          assert(!course.isNew);
          done();
        });
  });
});

describe("Reading course details", () => {
  it("finds course with courseSubject TEST", (done) => {
    const course = new CourseModel({
      courseSemester: {
        year: 2022,
        season: "FALL",
      },
      courseSubject: "TEST",
      courseTitle: "COURSE UNIT TEST",
      courseType: "LECTURE",
      courseNumber: 111,
      courseSection: 333,
      courseSchedule: [
        {
          day: "TUTH",
          time: "15:30 - 16:45",
        },
      ],
      courseInstructor: [
        "TEST",
      ],
      courseIsHonors: false,
      courseIsLab: false,
    });
    course.save()
        .then(() => CourseModel.findOne({courseSubject: "TEST"}))
        .then((course) => {
          assert(course.courseSubject === "TEST");
          done();
        });
  });
});

describe("Updating a course", () => {
  it("updates a course", (done) => {
    const course = new CourseModel({
      courseSemester: {
        year: 2022,
        season: "FALL",
      },
      courseSubject: "TEST",
      courseTitle: "COURSE UNIT TEST",
      courseType: "LECTURE",
      courseNumber: 111,
      courseSection: 333,
      courseSchedule: [
        {
          day: "TUTH",
          time: "15:30 - 16:45",
        },
      ],
      courseInstructor: [
        "TEST",
      ],
      courseIsHonors: false,
      courseIsLab: false,
    });
    course.save()
        .then(() => CourseModel.findOneAndUpdate({courseSubject: "TEST"}, {courseNumber: 222}))
        .then(() => CourseModel.findOne({courseSubject: "TEST"}))
        .then((course) => {
          assert(course.courseNumber === 222);
          done();
        });
  });
});

describe("Deleting a course", () => {
  it("removes a course", (done) => {
    const course = new CourseModel({
      courseSemester: {
        year: 2022,
        season: "FALL",
      },
      courseSubject: "TEST",
      courseTitle: "COURSE UNIT TEST",
      courseType: "LECTURE",
      courseNumber: 111,
      courseSection: 333,
      courseSchedule: [
        {
          day: "TUTH",
          time: "15:30 - 16:45",
        },
      ],
      courseInstructor: [
        "TEST",
      ],
      courseIsHonors: false,
      courseIsLab: false,
    });
    course.save()
        .then(() => CourseModel.findOneAndRemove({courseTitle: "COURSE UNIT TEST"}))
        .then(() => CourseModel.findOne({courseTitle: "COURSE UNIT TEST"}))
        .then((course) => {
          assert(course === null);
          done();
        });
  });
});

