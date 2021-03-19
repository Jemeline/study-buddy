/* eslint-disable linebreak-style */
const express = require("express");
const CourseModel = require("../models/course");
const app = express();

app.get("/course", async (req, res) => {
  const course = await CourseModel.find();
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/course/:id", async (req, res) => {
  const course = await CourseModel.findById(req.params.id);
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/course", async (req, res) => {
  const course = new CourseModel(req.body);
  try {
    await course.save();
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/course/:id", async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/course/:id", async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body);
    await CourseModel.save();
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
