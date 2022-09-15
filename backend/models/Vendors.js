const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
    unique: true
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
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
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
