/* eslint-disable no-unused-vars */
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
CRUD Operations on User Model
1. Create a user => Assert user is in collection
2. Read a user => Assert user can be read once inserted into collection
3. Create a user with non-unique email => Assert is not inserted and Mongo 11000 error thrown
4. Delete a user => Assert user is removed from collection
5. Update a user => Asset user role is updated from "student" to "tutor"

User Route Testing
1. Authentication succeeds for registered users
2. Authentication fails for incorrect/invalid credentials
3. Authentication fails for unregistered users
4. Registration succeeds for new user with unique email
5. Registration fails for new user with non-unique email
Tests can be run by the following command: cd functions && npm test
*/

const assert = require("assert");
const UserModel = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

afterEach(() => {
  UserModel.findOneAndRemove({email: "unit_test@email.com"}).then(() => done());
});

// CRUD operations on Mongoose User Model
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

// Authentication succeeds for registered users
describe("POST /user/login", () => {
  it("it should successfully login user with correct credentials", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save();
    const userLogin = {email: "unit_test@email.com", password: "TestTest1!"};
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .post("/api/user/login")
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });
});

// Authentication fails for incorrect/invalid credentials
describe("POST /user/login", () => {
  it("it should fail to login user with incorrect credentials", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save();
    const userLogin = {email: "unit_test@email.com", password: "TestTest2!"};
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .post("/api/user/login")
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("msg").eql("Invalid password");
          done();
        });
  });
});

// Authentication fails for unregistered users
describe("POST /user/login", () => {
  it("it should fail to login unregistered user", (done) => {
    const user = {email: "test_unregistered@email.com", password: "TestTest1!"};
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .post("/api/user/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("msg").eql("The email address is not associated with any account.");
          done();
        });
  });
});

// Registration succeeds for new user with unique email
describe("POST /user/register", () => {
  it("it should succeed in registering user with unique email", (done) => {
    const user = {
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      role: "student",
    };
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .post("/api/user/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });
});

// Registration fails for new user with non-unique email
describe("POST /user/register", () => {
  it("it should succeed in registering user with unique email", (done) => {
    const user = new UserModel({
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      dateMember: new Date(),
      role: "student",
    });
    user.save();
    const userIdentical = {
      email: "unit_test@email.com",
      password: "TestTest1!",
      first: "Test",
      last: "Test",
      role: "student",
    };
    chai.request("https://us-central1-study-buddy-d452c.cloudfunctions.net/app8")
        .post("/api/user/register")
        .send(userIdentical)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("msg").eql("The email address you have entered is already associated with another account.");
          done();
        });
  });
});
