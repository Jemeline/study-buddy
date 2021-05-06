/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const express = require("express");
const UserModel = require("../models/user");
const StudentProfileModel = require("../models/studentProfile");
const app = express();
const {check, validationResult} = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
    if (!user) return res.status(401).send({msg: "The email address is not associated with any account."});
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.status(401).send({msg: "Invalid password"});
      res.send({user: user.toJSON()});
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
          return res.status(401).send({msg: "The email address you have entered is already associated with another account."});
        }
        return res.status(500).send({msg: err.message});
      }
      res.send({user: newuser.toJSON()});
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);

app.post("/user/update/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/user/add/favorites/:id", async (req, res) => {
  try {
    const user = await UserModel.updateOne({_id: req.params.id}, {"$addToSet": {"favorites": req.body.favorite}});
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/user/remove/favorites/:id", async (req, res) => {
  try {
    const user = await UserModel.updateOne({_id: req.params.id}, {"$pull": {"favorites": req.body.favorite}}).exec()
    ;
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/user/update/password/:id", [
  check("oldPassword", "Old password required").not().isEmpty(),
  check("newPassword", "New Password required").notEmpty(),
], async (req, res) => {
  try {
    const user = await UserModel.findOne({_id: req.params.id});
    if (!user) return res.status(401).send({msg: "The user id is not associated with any account."});
    user.comparePassword(req.body.oldPassword, function(err, isMatch) {
      if (err) {
        return res.status(500).send({msg: err.message});
      }
      if (!isMatch) return res.status(401).send({msg: "Invalid password"});
      else {
        user.password = req.body.newPassword;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({msg: err.message});
          }
          res.send({user: user.toJSON()});
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/user", async (req, res) => {
  const users = await UserModel.find();
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/user/student", async (req, res) => {
  const users = await UserModel.find({role: "student"});
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    await StudentProfileModel.findOneAndDelete({_userId: req.params.id}, function(err) {
      if (err) return res.status(401).send({msg: "Could not delete student profile"});
    });
    if (!user) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/user/admin", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
  check("password", "Password required").isLength({min: 8}),
  check("first", "Firstname required").notEmpty(),
  check("last", "Lastname required").notEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const newuser = new UserModel(req.body);
    newuser.role = "admin";
    newuser.dateMember = new Date();
    newuser.isVerified = false;
    newuser.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          return res.status(401).send({msg: "The email address you have entered is already associated with another account."});
        }
        return res.status(500).send({msg: err.message});
      }
      res.send({user: newuser.toJSON()});
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
);

app.post("/user/forgot-password/:email", [
  check("email", "Email is not valid").not().isEmpty().isEmail().normalizeEmail({remove_dots: false}),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const user = await UserModel.findOne({email: req.params.email});
    if (!user) return res.status(401).send({msg: "The user id is not associated with any account."});
    user.passwordResetToken = crypto.randomBytes(8).toString("hex");
    const now = new Date().getTime();
    user.passwordResetExpires = now/1000 + 3600;
    user.save(function(err) {
      if (err) {
        return res.status(500).send({msg: err.message});
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: functions.config().studybuddy.gmail_account,
          pass: functions.config().studybuddy.gmail_password,
        },
      });
      const mailOptions = {
        from: functions.config().studybuddy.gmail_account,
        to: user.email, subject: "Study Buddy Password Reset",
        text: "Hello "+user.first.charAt(0).toUpperCase()+user.first.slice(1).toLowerCase()+",\n\n" + "Please reset your password using the following token: "+ user.passwordResetToken};
      transporter.sendMail(mailOptions, function(err) {
        if (err) {
          return res.status(500).send({msg: err.message});
        }
        res.status(200).send({msg: "A password reset token has been sent to " + user.email + "."});
      });
    });
  } catch (err) {
    res.status(500).send({msg: err.message});
  }
}
);

app.post("/user/forgot-password-verify/:token", [
  check("newPassword", "New Password required").notEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

  try {
    const user = await UserModel.findOne({passwordResetToken: req.params.token});
    if (!user) return res.status(401).send({msg: "The reset token is not associated with any account."});
    const now = new Date().getTime();
    if (user.passwordResetExpires <= now/1000) {
      return res.status(401).send({msg: "Your token has expired. Please request a new one."});
    }
    user.password = req.body.newPassword;
    user.save(function(err) {
      if (err) {
        return res.status(500).send({msg: err.message});
      }
      res.send({user: user.toJSON()});
    });
  } catch (err) {
    res.status(500).send({msg: err.message});
  }
}
);

module.exports = app;
