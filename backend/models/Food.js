const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FoodSchema = new Schema({
  vendor_id: {
    type: String,
    required: true,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  no_rating: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  sum_rating: {
    type: Number,
    default: 0,
  },
  nveg: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: false,
    },
  ],
  addonsname: [
    {
      type: String,
      required: false,
    },
  ],
  addonsprice: [
    {
      type: Number,
      required: false,
    },
  ],
  number_placed: {
    type: Number,
    default: 0,
  },
});

module.exports = Food = mongoose.model("Food", FoodSchema);
