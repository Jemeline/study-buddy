/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* Author: Jada Pfeiffer
Purpose: Backend unit testing for Course object. In each unit test, the following
Course is instantiated and added to the Course collection in MongoDB:

  const course = new CourseModel({
      courseSemester: "FALL",
      courseYear:2022,
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

After each test, the course is found and removed from the collection.
The following tests are conducted:
1. Course successfully added to database
2. Course successfully found by Course Subject

Tests can be run by the following command: cd functions && npm test
*/

const assert = require("assert");
const CourseModel = require("../models/course");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

afterEach(() => {
  CourseModel.findOneAndRemove({courseTitle: "COURSE UNIT TEST"}).then(() => done());
});

// Course successfully added to database
describe("Creating course", () => {
  it("creates a course", (done) => {
    const course = new CourseModel({
      courseSemester: "FALL",
      courseYear: 2022,
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
        .then((course) => {
          assert(!course.isNew);
          done();
        });
  });
});

// Course successfully found by Course Subject
describe("/course/find-by-subject/:subject", () => {
  it("it should GET all courses of designated courseSubject", (done) => {
    const subject = "BCB";
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .get(`/api/course/find-by-subject/${subject}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.greaterThan(0);
          done();
        });
  });
});
