// authentication (username, pass, email)

const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;