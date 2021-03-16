const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const courseRouter = require("./routes/courseRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const tokenRouter = require("./routes/tokenRoutes.js");
const getClient = require("./db.js");

const app6 = express();
const port = 3000;

app6.use(cors());
app6.use(express.json());
app6.use("/api", courseRouter);
app6.use("/api", userRouter);
app6.use("/api", tokenRouter);

app6.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  getClient();
});

exports.app6 = functions.https.onRequest(app6);
