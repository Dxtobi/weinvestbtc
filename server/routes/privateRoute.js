const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/privateRoute.js");
const { protect } = require("../middleware/auth.js");
require("dotenv").config()
router.route("/").get(protect, getPrivateData);

module.exports = router;
