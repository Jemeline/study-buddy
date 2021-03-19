/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    trim: true,
    lowercase: true,
    createIndexes: {unique: true},
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
  role: {
    type: String,
    required: [true, "Role required"],
    lowercase: true,
    enum: ["student", "tutor"],
    default: "student",
  },
  phoneNumber: {
    type: Number,
  },
  courses: {
    type: Array,
  },
});

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
