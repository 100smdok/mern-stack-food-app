var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        number: req.body.number,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        batch: req.body.batch,
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/addMoney", (req, res) => {
    const _id = req.body.id;
    console.log(_id);
	// Find user by email
	User.findOne({ _id }).then(buyer => {
		// Check if user email exists
		if (!buyer) {
			return res.status(404).json({
				error: "ID not found",
			});
        }
        else{
            buyer.wallet = req.body.wallet;
            buyer.save()
                .then(buyer => {
                    res.json(buyer);
                })  
                .catch(err => {
                    res.status(400).send(err);
                })
        }
	});
});

router.post("/edit", (req, res) => {
	const _id = req.body.id;
    console.log(_id);
	// Find user by email
	User.findOne({ _id }).then(buyer => {
		// Check if user email exists
		if (!buyer) {
			return res.status(404).json({
				error: "ID not found",
			});
        }
        else{
            buyer.name = req.body.name;
            buyer.number = req.body.number;
            buyer.age = req.body.age;
            buyer.batch = req.body.batch;

            buyer.save()
                .then(buyer => {
                    res.json(buyer);
                })  
                .catch(err => {
                    res.status(400).send(err);
                })
        }
	});
});

// POST request 
// Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

module.exports = router;