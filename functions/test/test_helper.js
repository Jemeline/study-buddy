/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Unit Testing helper function to connect to the MongoDB Atlas database
*/
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const functions = require("firebase-functions");

mongoose.connect(functions.config().studybuddy.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
    .once("open", () => console.log("Connected to the DB!"))
    .on("error", (error) => {
      console.warn("Error : ", error);
    });

