/* eslint-disable linebreak-style */
const express = require("express");
// const UserModel = require("../models/user");
// const TokenModel = require("../models/token");
// const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
// const {check, validationResult} = require("express-validator");
const functions = require("firebase-functions");

app.post("/massstudyinvite", (req, res) => {
  try {
    // res.status(200).send(`${req.body.user.first.charAt(0).toUpperCase()} ${req.body.user.first.slice(1).toLowerCase()} ${req.body.user.last.charAt(0).toUpperCase()}
    // ${req.body.user.last.slice(1).toLowerCase()} invited you to study for ${req.body.chosenClassClean}.
    // \n \n Date: ${req.body.datetime.slice(0, 15)} \n Time: ${req.body.datetime.slice(15, 20)} \n Location: ${req.body.location}
    // \n \n ${req.body.message}`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: functions.config().studybuddy.gmail_account,
        pass: functions.config().studybuddy.gmail_password,
      },
    });
    const mailOptions = {
      from: functions.config().studybuddy.gmail_account,
      to: req.body.classmates,
      subject: "Study Invitation from Study Buddy",
      text: req.body.formattedMessage,
    };
    transporter.sendMail(mailOptions, function(err) {
      if (err) {
        return res.status(500).send("There was a problem sending your email. Try again");
      } else {
        return res.status(200).send("Your email was sent!");
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = app;
