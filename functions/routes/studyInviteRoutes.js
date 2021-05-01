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
        return res.status(500)
            .send("There was a problem sending your email. Try again");
      } else {
        return res.status(200).send("Your email was sent!");
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = app;
