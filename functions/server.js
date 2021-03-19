/* eslint-disable linebreak-style */
const {https} = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const courseRouter = require("./routes/courseRoutes.js");
const userRouter = require("./routes/userRoutes.js");
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// const getClient = require("./db.js");

const app = express();
// const port = 3000;

app.use(cors());
app.use(express.json());
// app.use("/course", courseRouter);
app.use("/user", userRouter);

// Commented out mongoDB because I don't have the env config set up
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   getClient();
// });

exports.api = https.onRequest(app);
