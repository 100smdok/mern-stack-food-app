const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);
