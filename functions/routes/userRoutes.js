/* eslint-disable max-len */
const express = require("express");
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
const userModel = require("../models/user");
// const tokenModel = require('../models/token');
const app = express();
const {check, validationResult} = require("express-validator");

app.post("/user/login", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("password", "Password required").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  const user = await userModel.findOne({email: req.body.email}).select("-password");
  try {
    if (!user) return res.status(401).send({msg: "The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again."});
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.status(401).send({msg: "Invalid email or password"});
      if (!user.isVerified) return res.status(401).send({type: "not-verified", msg: "Your account has not been verified."});
      res.send({user: user.toJSON()});
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);


module.exports = app;
