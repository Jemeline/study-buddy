/* eslint-disable max-len */
/* eslint-disable no-undef */
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
