var express = require("express");
var router = express.Router();
const Order = require("../models/Order");
router.post("/add", (req, res) => {
  console.log(req.body);
  const newOrder = new Order({
    buyer_id: req.body.buyer_id,
    food_id: req.body.food_id,
    quantity: req.body.quantity,
    placedOn: req.body.placedOn,
  });
  console.log(newOrder);
  newOrder
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/getorders", (req, res) => {
  const buyer_id = req.body.buyer_id;
  Order.find({ buyer_id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/editstatus", (req, res) => {
  const _id = req.body.order_id;
  Order.findOne({ _id }).then((order) => {
    order.status = req.body.status;
    order.save().then((order) => {
      res.status(200).json(order);
    });
  });
});
router.post("/rate", (req, res) => {
  const _id = req.body.order_id;
  Order.findOne({ _id }).then((order) => {
    order.canRate = false;
    order.save().then((order) => {
      res.status(200).json(order);
    });
  });
});
router.post("/updateStatus", (req, res) => {
  const _id = req.body.order_id;
  Order.findOne({ _id }).then((order) => {
    order.status = req.body.status;
    order.save().then((order) => {
      res.status(200).json(order);
    });
  });
});
router.post("/getallorders", (req, res) => {
  Order.find().then((order) => {
    res.status(200).json(order);
  });
});
module.exports = router;
