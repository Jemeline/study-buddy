/* eslint-disable linebreak-style */
const express = require("express");
const AdvertisementModel = require("../models/advertisement");
const app = express();

// Get all advertisements
app.get("/advertisement", async (req, res) => {
  try {
    const ads = await AdvertisementModel.find();
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get advertisements by ID
app.get("/advertisement/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const ads = await AdvertisementModel
        .findById(req.params.id).exec()
        .catch((err) => res.status(500).send(err));
    res.send(ads);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create new advertisement
// Body must contain tutor email, text, and courses
app.post("/advertisement", async (req, res) => {
  try {
    const {tutorEmail, text, courses} = req.body;
    if (!tutorEmail || !text || !courses) {
      res.status(400).send("Body must contain tutor email, text, and courses.");
    }
    const ad = new AdvertisementModel(req.body);
    await ad.save();
    res.status(201).send(ad);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
