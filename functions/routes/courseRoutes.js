/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: CRUD routes for Course object. See the following document for detailed
API descriptions of the utilized Course routes:
https://docs.google.com/document/d/1YBo-JZqJDuFYI9B0bbcqIF3TLFgrI5Km5-gBzN6nqEc/edit?usp=sharing
*/
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

app.get("/course/find-by-pagination/:limit/:skip", async (req, res) => {
  const course = await CourseModel.find({}).skip(req.params.skip).limit(req.params.limit);
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/course/find-by-subject/:subject", async (req, res) => {
  const course = await CourseModel.find({courseSubject: (req.params.subject).toUpperCase()});
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/course/find-by-subject-and-semester/:subject/:year/:season", async (req, res) => {
  const course = await CourseModel.find({courseSubject: (req.params.subject).toUpperCase(), courseYear: req.params.year, courseSemester: (req.params.season).toUpperCase()});
  try {
    res.send(course);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/course/find-by-id/:id", async (req, res) => {
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

app.post("/course/find-many-by-id", async (req, res) => {
  const ids = req.body.ids;
  try {
    const courses = await CourseModel.find({"_id": {$in: ids}});
    res.send(courses);
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
