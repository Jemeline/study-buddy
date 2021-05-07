/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Helper function to connect to the MongoDB Atlas database inside of server.js
*/
const mongoose = require("mongoose");
const functions = require("firebase-functions");
mongoose.Promise = global.Promise;

const getClient = async () => {
  mongoose
      .connect(functions.config().studybuddy.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });
};

module.exports = getClient;
