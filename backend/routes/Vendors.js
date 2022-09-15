var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the Vendor
router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
		if (err) {
			console.log(err);
		} else {
			res.json(vendors);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        number: req.body.number,
        shopName: req.body.shopName,
		openTime: req.body.openTime,
		closeTime: req.body.closeTime,
        email: req.body.email,
        password: req.body.password,
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/edit", (req, res) => {
	const _id = req.body.id;
    console.log(_id);
	// Find user by email
	Vendor.findOne({ _id }).then(vendor => {
		// Check if user email exists
		if (!vendor) {
			return res.status(404).json({
				error: "ID not found",
			});
        }
        else{
            vendor.name = req.body.name;
            vendor.number = req.body.number;
            vendor.shopName = req.body.shopName;
            vendor.openTime = req.body.openTime;
            vendor.closeTime = req.body.closeTime;

            vendor.save()
                .then(vendor => {
                    res.json(vendor);
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
// 	Vendor.findOne({ email }).then(vendor => {
// 		// Check if user email exists
// 		if (!vendor) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return vendor;
//         }
// 	});
// });

module.exports = router;

