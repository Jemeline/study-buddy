const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const courseRouter = require("./routes/courseRoutes.js");
const getClient = require("./db.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", courseRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  getClient();
});

exports.app = functions.https.onRequest(app);
