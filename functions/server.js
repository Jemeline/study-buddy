/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Express server connected to MongoDB Atlas using Mongoose
wrapped in a firebase function for deployment.
Utilizes six different routers with all endpoints from the base URL:
https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api
For more information on API deployment:
https://firebase.google.com/docs/functions/get-started
*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const courseRouter = require("./routes/courseRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const tokenRouter = require("./routes/tokenRoutes.js");
const studentProfileRouter = require("./routes/studentProfileRoutes.js");
const AdvertisementRouter = require("./routes/advertisementRoutes");
const massStudyInviteRouter = require("./routes/studyInviteRoutes.js");
const getClient = require("./db.js");

const app8 = express();

app8.use(cors());
app8.use(express.json());
app8.use("/api", courseRouter);
app8.use("/api", userRouter);
app8.use("/api", tokenRouter);
app8.use("/api", studentProfileRouter);
app8.use("/api", AdvertisementRouter);
app8.use("/api", massStudyInviteRouter);


getClient();

exports.app8 = functions.https.onRequest(app8);
