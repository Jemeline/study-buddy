/* eslint-disable linebreak-style */
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
const getClient = require("./db.js");

const app8 = express();

app8.use(cors());
app8.use(express.json());
app8.use("/api", courseRouter);
app8.use("/api", userRouter);
app8.use("/api", tokenRouter);
app8.use("/api", studentProfileRouter);
app8.use("/api", AdvertisementRouter);

getClient();

exports.app8 = functions.https.onRequest(app8);
