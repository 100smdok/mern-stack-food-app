const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  buyer_id: {
    type: String,
    required: true,
  },
  food_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  canRate: {
    type: Boolean,
    default: true,
  },
  placedOn: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "placed",
  },
  addonsname: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = Order = mongoose.model("Order", OrderSchema);
