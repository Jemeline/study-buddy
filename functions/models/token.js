/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* Author: Jada Pfeiffer
Purpose: Mongoose data schema for Token object.
The Token object is populated once a user registers and during the email verification
process. The user requests a token to be sent to their registration email. Tokens
expire 30 minutes after creation and the document is removed from the collection.
A Token is linked to a User by the unique _userId field.
For detailed data definitions: https://docs.google.com/document/d/14qkdYCDylZk62Gv6M04fyYsa7VxupBWX4OhFtDWyD-M/edit?usp=sharing
*/
const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  token: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now, expires: 1800},
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
