const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const courseRouter = require("./routes/courseRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const getClient = require("./db.js");

const app3 = express();
const port = 3000;

app3.use(cors());
app3.use(express.json());
app3.use("/api", courseRouter);
app3.use("/api", userRouter);

app3.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  getClient();
});

exports.app3 = functions.https.onRequest(app3);
