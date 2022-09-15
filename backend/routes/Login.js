var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendors");

const User = require("../models/Users");

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(res.body);
  User.findOne({ email }).then((buyer) => {
    console.log(buyer);
    if (buyer) {
      if (buyer.password !== password) {
        return res.status(401).json({
          error: "Password incorrect",
        });
      } else {
        return res.status(200).json({
          message: "Login successful",
          user: buyer,
          type: "buyer",
        });
      }
    } else {
      Vendor.findOne({ email }).then((vendor) => {
        console.log(vendor);
        if (!vendor) {
          return res.status(404).json({
            error: "Email not found",
          });
        } else {
          if (vendor.password !== password) {
            return res.status(401).json({
              error: "Password incorrect",
            });
          } else {
            return res.status(200).json({
              message: "Login successful",
              user: vendor,
              type: "vendor",
            });
          }
        }
      });
    }
  });
});

module.exports = router;
