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

const app7 = express();

app7.use(cors());
app7.use(express.json());
app7.use("/api", courseRouter);
app7.use("/api", userRouter);
app7.use("/api", tokenRouter);
app7.use("/api", studentProfileRouter);
app7.use("/api", AdvertisementRouter);

getClient();

exports.app7 = functions.https.onRequest(app7);
