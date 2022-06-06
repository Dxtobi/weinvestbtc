const express = require("express");
const router = express.Router();
require("dotenv").config()
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  getmydetails,
  set_subscription_plan,
  make_transaction,
  make_withdraw,
  get_all_transaction_details,
  confirm_transaction,
  failed_transaction
} = require("../controllers/auth.js");

// setting up register route
router.route("/register").post(register);
// login route
router.route("/login").post(login);
// forgot password route
router.route("/forgot-password").post(forgotpassword);
// reset password route
router.route("/reset-password/:resetToken").put(resetpassword);


// get dashboard details
router.route("/get_my_details").get(getmydetails);
router.route("/set_subscription_plan").post(set_subscription_plan);
router.route("/make_transfer").post(make_transaction);
router.route("/make_withdraw").post(make_withdraw);
router.route("/get_all_transaction_details").get(get_all_transaction_details);
router.route("/confirm_transaction").post(confirm_transaction);
router.route("/failed_transaction").post(failed_transaction);

//get_all_transaction_details
//make_transfer
module.exports = router;
