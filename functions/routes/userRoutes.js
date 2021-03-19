/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const express = require("express");
const app = express();
const {check, validationResult} = require("express-validator");
const admin = require("firebase-admin");
// const UserModel = require("../models/user");

// Manually create this file from
// Firebase console -> Project Settings -> Service Accounts -> Generate new private key
const config = require("../config.json");

admin.initializeApp({
  credential: admin.credential.cert(config),
});
const auth = admin.auth();

app.post("/register", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("first", "Firstname required").notEmpty(),
  check("last", "Lastname required").notEmpty(),
  check("role", "Role required").notEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const {email, role} = req.body;
    const {uid} = await auth.getUserByEmail(email);
    const claims = {student: role==="student", tutor: role==="tutor", admin: false};
    await auth.setCustomUserClaims(uid, claims);

    res.status(200).send("Success");
    // const newuser = new UserModel(req.body);
    // newuser.save((err) => {
    //   return err ? res.status(500).send({msg: err.message}) : res.status(200).send({user: newuser.toJSON()});
    // });
  } catch (err) {
    res.status(500).send(err);
  }
}
);

// email: email of the account to add admin claims
// token: token of user with existing admin claim
app.post("/newAdmin", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("token", "Token required").notEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const {email, token} = req.body;
    const tokenUID = (await auth.verifyIdToken(token)).uid;
    const tokenUser = await auth.getUser(tokenUID);
    if (tokenUser.customClaims.admin) {
      const {uid} = await auth.getUserByEmail(email);
      const claims = {student: true, tutor: true, admin: true};
      await auth.setCustomUserClaims(uid, claims);
      res.status(200).send("Admin created");
    } else {
      res.status(400).send("User is not an admin");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
);

module.exports = app;
