const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const courseRouter = require("./routes/courseRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const tokenRouter = require("./routes/tokenRoutes.js");
const getClient = require("./db.js");

const app5 = express();
const port = 3000;

app5.use(cors());
app5.use(express.json());
app5.use("/api", courseRouter);
app5.use("/api", userRouter);
app5.use("/api", tokenRouter);

app5.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  getClient();
});

exports.app5 = functions.https.onRequest(app5);
