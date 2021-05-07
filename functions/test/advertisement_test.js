/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* Author: Jada Pfeiffer
Purpose: Backend unit testing for Advertisement object. In each unit test, the following
Course is instantiated and added to the Advertisement collection in MongoDB:

  const ad = new AdvertisementModel({
      tutorEmail: "unit_test@email.com",
      text: "Test",
      courses: ["COMP 541"],
      first: "Test",
      last: "Test",
      ratings: [5],
  });

After each test, the advertisement is found and removed from the collection.
The following tests are conducted:
1. Create a advertisement => Assert advertisement is in collection
2. Read a advertisement => Assert advertisement can be read once inserted into collection
3. Delete a advertisement => Assert advertisement is removed from collection
4. Update a advertisement => Asset advertisement text is updated from "Test" to "Test Test"

Tests can be run by the following command: cd functions && npm test
*/
const assert = require("assert");
const AdvertisementModel = require("../models/advertisement");

afterEach(() => {
  AdvertisementModel.findOneAndRemove({tutorEmail: "unit_test@email.com"}).then(() => done());
});

describe("Creating tutor advertisement", () => {
  it("creates a tutor advertisement", (done) => {
    const ad = new AdvertisementModel({
      tutorEmail: "unit_test@email.com",
      text: "Test",
      courses: ["COMP 541"],
      first: "Test",
      last: "Test",
      ratings: [5],
    });
    ad.save()
        .then(() => {
          assert(!ad.isNew);
          done();
        });
  });
});

describe("Reading tutor advetisement details", () => {
  it("finds tutor advertisement with tutorEmail unit_test@email.com", (done) => {
    const ad = new AdvertisementModel({
      tutorEmail: "unit_test@email.com",
      text: "Test",
      courses: ["COMP 541"],
      first: "Test",
      last: "Test",
      ratings: [5],
    });
    ad.save()
        .then(() => AdvertisementModel.findOne({tutorEmail: "unit_test@email.com"}))
        .then((ad) => {
          assert(ad.tutorEmail === "unit_test@email.com");
          done();
        });
  });
});

describe("Updating a tutor advertisement", () => {
  it("updates a tutor advertisement", (done) => {
    const ad = new AdvertisementModel({
      tutorEmail: "unit_test@email.com",
      text: "Test",
      courses: ["COMP 541"],
      first: "Test",
      last: "Test",
      ratings: [5],
    });
    ad.save()
        .then(() => AdvertisementModel.findOneAndUpdate({tutorEmail: "unit_test@email.com"}, {text: "Test Test"}))
        .then(() => AdvertisementModel.findOne({tutorEmail: "unit_test@email.com"}))
        .then((ad) => {
          assert(ad.text === "Test Test");
          done();
        });
  });
});

describe("Deleting a tutor advetisement", () => {
  it("removes a tutor advetisement", (done) => {
    const ad = new AdvertisementModel({
      tutorEmail: "unit_test@email.com",
      text: "Test",
      courses: ["COMP 541"],
      first: "Test",
      last: "Test",
      ratings: [5],
    });
    ad.save()
        .then(() => AdvertisementModel.findOneAndRemove({tutorEmail: "unit_test@email.com"}))
        .then(() => AdvertisementModel.findOne({tutorEmail: "unit_test@email.com"}))
        .then((ad) => {
          assert(ad === null);
          done();
        });
  });
});

