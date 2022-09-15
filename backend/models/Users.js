const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  favourites: [String]
});

module.exports = User = mongoose.model("Users", UserSchema);
