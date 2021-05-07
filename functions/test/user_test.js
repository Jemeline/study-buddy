/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* Author: Jada Pfeiffer
Purpose: Backend unit testing for User object. In each unit test, the following
User is instantiated and added to the User collection in MongoDB:

  const user = new UserModel({
        email: "unit_test@email.com",
        password: "TestTest1!",
        first: "Test",
        last: "Test",
        dateMember: new Date(),
        role: "student",
  });

After each test, the user is found and removed from the collection.
The following tests are conducted:
1. Create a user => Assert user is in collection
2. Read a user => Assert user can be read once inserted into collection
3. Create a user with non-unique email => Assert is not inserted and Mongo 11000 error thrown
4. Delete a user => Assert user is removed from collection
5. Update a user => Asset user role is updated from "student" to "tutor"

Tests can be run by the following command: cd functions && npm test
*/

const assert = require("assert");
const UserModel = require("../models/user");

afterEach(() => {
  UserModel.findOneAndRemove({email: "unit_test@email.com"}).then(() => done());
});

describe("Creating user", () => {
  it("creates a user", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => {
          assert(!user.isNew);
          done();
        });
  });
});

describe("Reading user details", () => {
  it("finds user with email unit_test@email.com", (done) => {
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
          assert(user.email === "unit_test@email.com");
          done();
        });
  });
});

describe("Creating user with same email", () => {
  it("fails to create a user with same email", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    const userIdentical = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => userIdentical.save((err) => {
          if (err) {
            assert(err.code === 11000);
            return done();
          }
          throw new Error("Email not unique");
        }));
  });
});

describe("Deleting a user", () => {
  it("removes a user", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOneAndRemove({email: "unit_test@email.com"}))
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          assert(user === null);
          done();
        });
  });
});

describe("Updating a user", () => {
  it("updates a user", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save()
        .then(() => UserModel.findOneAndUpdate({email: "unit_test@email.com"}, {role: "tutor"}))
        .then(() => UserModel.findOne({email: "unit_test@email.com"}))
        .then((user) => {
          assert(user.role === "tutor");
          done();
        });
  });
});
