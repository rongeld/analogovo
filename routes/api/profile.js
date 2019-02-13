// Education, Exierense, Camera, Interests...

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');



// Load validation
const validateProfileInput = require('../../validation/profile')

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');


// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get('/all', (req, res) => {
    const errors = {}
   Profile.find()
   .populate('user', ['name', 'camera'])
   .then(profiles => {
       if (!profiles) {
            errors.noProfile = 'There are no profiles for this user';
           return res.status(404).json(errors)
       }

       res.json(profiles);
   }).catch(err => res.status(404).json(errors))
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'camera'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/camera/:camera
// @desc    Get profile by camera
// @access  Public

router.get('/camera/:camera', (req, res) => {
    const errors = {};
    Profile.findOne({camera: req.params.camera})
        .populate('user', ['name', 'camera'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))

});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'camera'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))

});

// @route   POST api/profile
// @desc    create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        const {errors, isValid} = validateProfileInput(req.body);

        // CHeck validation
        if (!isValid) {
            // return any errors with 400
            return res.status(400).json(errors);
        }

    
        // Get Fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle
        if(req.body.about) profileFields.about = req.body.about
        if(req.body.location) profileFields.location = req.body.location
        profileFields.social = {};
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin

        Profile.findOne({user: req.user.id})
            .populate('user', ['name', 'camera'])
            .then(profile => {
                if(profile) {
                    //Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id }, 
                        {$set: profileFields}, 
                        {new: true}
                    )
                    .populate('user', ['name', 'camera'])
                    .then(profile => res.json(profile));
                } else {
                    //create

                    // Check if handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .populate('user', ['name', 'camera'])
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'That handle already exists';
                                res.status(400).json(errors);
                            }

                            // Save profile
                            new Profile(profileFields).save().then(profile => res.json(profile))
                        })
                }
            })

    }
)


module.exports = router;