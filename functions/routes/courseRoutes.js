const express = require('express');
const courseModel = require('../models/course');
const app = express();

app.get('/course', async (req, res) => {
    const course = await courseModel.find();
    try {
      res.send(course);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.get('/course/:id', async (req, res) => {
    const course = await courseModel.findById(req.params.id);
    try {
      res.send(course);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.post('/course', async (req, res) => {
    const course = new courseModel(req.body);
    
    try {
      await course.save();
      res.send(course);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.delete('/course/:id', async (req, res) => {
    try {
      const course = await courseModel.findByIdAndDelete(req.params.id)
  
      if (!course) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
});

app.patch('/course/:id', async (req, res) => {
    try {
      await courseModel.findByIdAndUpdate(req.params.id, req.body)
      await courseModel.save()
      res.send(course)
    } catch (err) {
      res.status(500).send(err)
    }
});
  
module.exports = app