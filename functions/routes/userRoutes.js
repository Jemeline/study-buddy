/* eslint-disable max-len */
const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user");
const TokenModel = require("../models/token");
const app = express();
const {check, validationResult} = require("express-validator");
const functions = require("firebase-functions");

app.post("/user/login", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("password", "Password required").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  const user = await UserModel.findOne({email: req.body.email});
  try {
    if (!user) return res.status(401).send({msg: "The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again."});
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.status(401).send({msg: "Invalid email or password"});
      res.send({user: user.toJSON()});
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);

app.post("/user/login2", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("password", "Password required").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  const user = await UserModel.findOne({email: req.body.email});
  try {
    if (!user) return res.status(401).send({msg: "The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again."});
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.status(401).send({msg: "Invalid email or password"});
      if (!user.isVerified) return res.status(401).send({type: "not-verified", msg: "Your account has not been verified."});
      res.send({token: "insert token here", user: user.toJSON()});
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);

app.post("/user/register", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("password", "Password required").isLength({min: 8}),
  check("first", "Firstname required").notEmpty(),
  check("last", "Lastname required").notEmpty(),
  check("role", "Role required").notEmpty().custom((value, {req}) => value !== "admin"),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const newuser = new UserModel(req.body);
    newuser.dateMember = new Date();
    newuser.isVerified = false;
    newuser.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).send({msg: "The email address you have entered is already associated with another account."});
        }
        return res.status(500).send({msg: err.message});
      }
      const token = new TokenModel({_userId: newuser._id, token: crypto.randomBytes(3).toString("hex")});

      token.save(function(err) {
        if (err) {
          if (err.code === 11000) {
            return res.status(400).send({msg: "The email address you have entered is already associated with another token."});
          }
          return res.status(500).send({msg: err.message});
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: functions.config().studybuddy.gmail_account,
            pass: functions.config().studybuddy.gmail.password,
          },
        });
        const mailOptions = {
          from: functions.config().studybuddy.gmail_account,
          to: newuser.email,
          subject: "Study Buddy Account Verification Token",
          text: "Hello,\n\n" + "Please verify your account by clicking the link: \nhttp://" + req.headers.host + "/confirmation/" + newuser._id + "/"+ token.token +"\n"};
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({msg: err.message});
          }
          res.status(200).send("A verification email has been sent to " + newuser.email + ".");
        });
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);


module.exports = app;
