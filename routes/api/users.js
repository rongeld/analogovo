// authentication (username, pass, email)

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // secure password (hide text)
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// LOAD INPUT VALIDAITION
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/registes
// @desc    Register user
// @access  Public

router.post("/register", (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors);
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

  
// @route   GET api/users/login
// @desc    Login User / Returning JWT TOKEN
// @access  Public

router.post("/login", (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({email})
    .then(user => {
      // CHeck for user
      if(!user) {
        errors.email = "User not found"
        return res.status(404).json(errors)
      }

      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              camera: user.camera
            } // create jwt payload

            // Sign Token
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 100000}, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            });
          } else {
            errors.password = "Password is incorrect"
            return res.status(400).json(errors);
          }
        })
    })
})


  
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    name: req.user.name,
    camera: req.user.camera,
    email: req.user.email,
    id: req.user.id
  })
})

module.exports = router;