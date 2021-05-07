/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* Author: Jada Pfeiffer
Purpose: Backend unit testing for StudentProfile object. In each unit test, the following
StudentProfile is instantiated and added to the StudentProfile collection in MongoDB:

  const profile = new StudentProfileModel({
      _userId: userId,
      graduationYear: 2021,
      studentType: "undergraduate",
      programOfStudy: {
        major: [
          "Art History Major, B.A.",
        ],
        minor: [
          "American Studies Minor",
        ],
        graduateProgram: ["Art History PhD"],
      },
      courseSchedule: [
        "604a5874d7ec68b7140e9ed0",
      ],
      learningType: [
        "visual",
      ],
  });

The variable userId is utilized to store the _id of the user once added to the DB
since every StudentProfile is associated with a _userId. In order to unit test the
StudentProfile model, a user must first be inserted during every test and then the
subsequent StudentProfile can be inseted and linked using the _userId
reference to the user model.

After each test, the User and StudentProfile objects are found and removed from the collection.
The following tests are conducted:
1. Create a StudentProfile => Assert StudentProfile is in collection
2. Read a StudentProfile => Assert StudentProfile can be read once inserted into collection
3. Delete a StudentProfile => Assert StudentProfile is removed from collection
4. Update a StudentProfile => Asset StudentProfile graduationYear is updated from 2100 to 2200

Tests can be run by the following command: cd functions && npm test
*/
const assert = require("assert");
const StudentProfileModel = require("../models/studentProfile");
const UserModel = require("../models/user");

let userId = 1111111111;
afterEach(() => {
  StudentProfileModel.findOneAndRemove({_userId: userId}).then(() => done());
  UserModel.findOneAndRemove({email: "unit_test@email.com"}).then(() => done());
});

describe("Creating student profile", () => {
  it("creates a student profile", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          userId = user._id;
          const profile = new StudentProfileModel({
            _userId: userId,
            graduationYear: 2021,
            studentType: "undergraduate",
            programOfStudy: {
              major: [
                "Art History Major, B.A.",
              ],
              minor: [
                "American Studies Minor",
              ],
              graduateProgram: ["Art History PhD"],
            },
            courseSchedule: [
              "604a5874d7ec68b7140e9ed0",
            ],
            learningType: [
              "visual",
            ],
          });
          profile.save((err) => {
            assert(!profile.isNew);
            done();
          });
        });
  });
});

describe("Reading student profile details", () => {
  it("finds student profile with certain _userId", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          userId = user._id;
          const profile = new StudentProfileModel({
            _userId: userId,
            graduationYear: 2100,
            studentType: "undergraduate",
            programOfStudy: {
              major: [
                "Art History Major, B.A.",
              ],
              minor: [
                "American Studies Minor",
              ],
              graduateProgram: ["Art History PhD"],
            },
            courseSchedule: [
              "604a5874d7ec68b7140e9ed0",
            ],
            learningType: [
              "visual",
            ],
          });
          profile.save()
              .then(() => StudentProfileModel.findOne({_userId: userId}))
              .then((user) => {
                assert(user.graduationYear === 2100);
                done();
              });
        });
  });
});

describe("Deleting a student profile", () => {
  it("removes a student profile", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          userId = user._id;
          const profile = new StudentProfileModel({
            _userId: userId,
            graduationYear: 2100,
            studentType: "undergraduate",
            programOfStudy: {
              major: [
                "Art History Major, B.A.",
              ],
              minor: [
                "American Studies Minor",
              ],
              graduateProgram: ["Art History PhD"],
            },
            courseSchedule: [
              "604a5874d7ec68b7140e9ed0",
            ],
            learningType: [
              "visual",
            ],
          });
          profile.save()
              .then(() => StudentProfileModel.findOneAndRemove({_userId: userId}))
              .then(() => StudentProfileModel.findOne({_userId: userId}))
              .then((user) => {
                assert(user === null);
                done();
              });
        });
  });
});

describe("Updating a student profile", () => {
  it("updates a student profile", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          userId = user._id;
          const profile = new StudentProfileModel({
            _userId: userId,
            graduationYear: 2100,
            studentType: "undergraduate",
            programOfStudy: {
              major: [
                "Art History Major, B.A.",
              ],
              minor: [
                "American Studies Minor",
              ],
              graduateProgram: ["Art History PhD"],
            },
            courseSchedule: [
              "604a5874d7ec68b7140e9ed0",
            ],
            learningType: [
              "visual",
            ],
          });
          profile.save()
              .then(() => StudentProfileModel.findOneAndUpdate({_userId: userId}, {graduationYear: 2200}))
              .then(() => StudentProfileModel.findOne({_userId: userId}))
              .then((user) => {
                assert(user.graduationYear === 2200);
                done();
              });
        });
  });
});


