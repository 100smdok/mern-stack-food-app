var express = require("express");
var router = express.Router();

const Food = require("../models/Food");

router.post("/add", (req, res) => {
  const newFood = new Food({
    vendor_id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    nveg: req.body.nveg,
    vendor_name: req.body.vendorName,
  });
  newFood
    .save()
    .then((food) => {
      res.status(200).json(food);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/getFood", (req, res) => {
  console.log(req.body.id);
  const vendor_id = req.body.id;
  console.log(vendor_id);
  Food.find({ vendor_id })
    .then((food) => {
      res.status(200).json(food);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/delete", (req, res) => {
  const _id = req.body.id;
  console.log(_id);
  Food.findOneAndDelete({ _id })
    .then((food) => {
      res.status(200).json(food);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/edit", (req, res) => {
  const _id = req.body.id;
  console.log(_id);
  Food.findOne({ _id })
    .then((food) => {
      food.name = req.body.name;
      food.price = req.body.price;
      food.nveg = req.body.nveg;
      food
        .save()
        .then((food) => {
          res.status(200).json(food);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/getallfood", (req, res) => {
  Food.find()
    .then((food) => {
      res.status(200).json(food);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/rate", (req, res) => {
  const _id = req.body.food_id;
  console.log(_id);
  Food.findOne({ _id })
    .then((food) => {
      food.sum_rating += req.body.rating;
      food.no_rating += 1;
      food.rating = food.sum_rating / food.no_rating;
      food
        .save()
        .then((food) => {
          res.status(200).json(food);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/updatenumber", (req, res) => {
  const _id = req.body.food_id;
  Food.findOne({ _id })
    .then((food) => {
      food.number_placed += 1;
      food
        .save()
        .then((food) => {
          res.status(200).json(food);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = router;
