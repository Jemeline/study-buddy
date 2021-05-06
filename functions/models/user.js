/* eslint-disable linebreak-style */
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

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
