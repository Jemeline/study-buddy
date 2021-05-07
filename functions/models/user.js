/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Mongoose data schema for User object.
The User object is the primary data object associated with every user. There is a
unique index placed in the email field to prevent duplicate emails. A user is identifiable
by either the unique email field or the unique Mongo objectId field. Users can have one
of three roles: student, tutor, or admin.

The User object has several methods attached.
The first utilizes bcrypt.js to hash and salt the password field any time
save() is called on the User object (ie when user created or updated) (see citation below).
User.toJSON() returns a User object without the password field for security.
Lastly, the User object has a comparePassword method which is utilized for authentication (see citation below).
The User methods were utilized from this source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
For detailed data definitions: https://docs.google.com/document/d/14qkdYCDylZk62Gv6M04fyYsa7VxupBWX4OhFtDWyD-M/edit?usp=sharing
*/
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    trim: true,
    lowercase: true,
    createIndexes: {unique: true},
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  first: {
    type: String,
    required: [true, "Firstname required"],
    lowercase: true,
  },
  last: {
    type: String,
    required: [true, "Lastname required"],
    lowercase: true,
  },
  dateMember: {
    type: Date,
    required: [true, "DateMember required"],
  },
  role: {
    type: String,
    required: [true, "Role required"],
    lowercase: true,
    enum: ["student", "tutor", "admin"],
    default: "student",
  },
  phoneNumber: {
    type: Number,
  },
  phoneNumberVerified: {type: Boolean, default: false},
  isVerified: {type: Boolean, default: false},
  isSurveyed: {type: Boolean, default: false},
  passwordResetToken: {type: String},
  passwordResetExpires: {type: Number, default: false},
  disabled: {type: Boolean, default: false},
  avatar: {type: String},
  favorites: {type: [mongoose.Schema.Types.ObjectId]},
});


UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre("save", function(next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.methods.comparePassword = function(pass, callback) {
  bcrypt.compare(pass, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
