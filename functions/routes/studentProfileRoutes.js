/* eslint-disable max-len */
const express = require("express");
const StudentProfileModel = require("../models/studentProfile");
const UserModel = require("../models/user");
const app = express();
const {check, validationResult} = require("express-validator");

app.get("/student-profile", async (req, res) => {
  const profile = await StudentProfileModel.find();
  try {
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/student-profile/find-by-id/:id", async (req, res) => {
  const profile = await StudentProfileModel.findById(req.params.id);
  try {
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/student-profile", [
  check("_userId", "_userId required").not().isEmpty(),
  check("graduationYear", "Graduation Year required").not().isEmpty(),
  check("studentType", "Student Type required").notEmpty(),
  check("major", "Major required").notEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
  try {
    const user = await UserModel.findById(req.body._userId);
    if (!user) return res.status(401).send({msg: "There is no user with this ID"});
    const profile = new StudentProfileModel(req.body);
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
}
);

app.delete("/student-profile/:id", async (req, res) => {
  try {
    const profile = await StudentProfileModel.findByIdAndDelete(req.params.id);
    if (!profile) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/student-profile/:id", async (req, res) => {
  try {
    const profile = await StudentProfileModel.findByIdAndUpdate(req.params.id, req.body);
    await StudentProfileModel.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;