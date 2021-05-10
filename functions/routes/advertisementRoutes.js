/* eslint-disable linebreak-style */
// Written by Sai Gongidi
// Tutor Advertisement CRUD Operations

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

// Find advertisements by email
app.post("/advertisement/email", async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).send("Must include an email in the request body.");
    }
    const ads = await AdvertisementModel
        .find({"tutorEmail": req.body.email}).exec()
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
    const {tutorEmail, text, courses, first, last, ratings} = req.body;
    if (!tutorEmail || !text || !courses || !first || !last || !ratings) {
      res.status(400).send("Body must contain all required fields.");
    }
    const ad = new AdvertisementModel(req.body);
    await ad.save();
    res.status(201).send(ad);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update advertisement
// Body must contain advertisement object
app.put("/advertisement", async (req, res) => {
  try {
    const {ad} = req.body;
    if (!ad) {
      res.status(400).send("Body must contain an Advertisement object.");
    }
    console.log(ad);
    const newAd = await AdvertisementModel
        .findByIdAndUpdate(ad._id, ad)
        .catch((err) => res.status(500).send(err));
    res.status(200).send(newAd);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete advertisement by ID
app.delete("/advertisement/:id", async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("Must send an ID");
    const ad = await AdvertisementModel.findByIdAndDelete(req.params.id);
    res.status(200).send(ad);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
