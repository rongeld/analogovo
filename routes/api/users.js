// authentication (username, pass, email)

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // secure password (hide text)

// Load User model
const User = require("../../models/User");

// @route   GET api/posts/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/posts/registes
// @desc    Register user
// @access  Public

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          camera: req.body.camera,
          password: req.body.password
        });
  
        // Secure PASSWORD 10 - characters we want
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; //setting the use password to the hash password
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

module.exports = router;