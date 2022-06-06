const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const btcAdd = [
  'bc1qncr8rlt7u2tepx68durwm4ma5g8cj9ljlpdfa8',
  'bc1qv7sz8mvk097lukg6pwsa624pzl86q336hujazk',
  'bc1qpujj5sdqnfp9qxu2xdfc3kg7wqhwqy0xkql2s9',
]
const btc = Math.floor(Math.random() * btcAdd.length);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please insert user name"],
  },
  btcAdd: {
    type: String,
    required: true,
    default:btcAdd[btc]

  },
  email: {
    type: String,
    required: [true, "Please insert email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please insert valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please insert password"],
    minlength: 6,
    select: false,
  },
  ballance: {
    type: Number,
    default:10
  },
  plan: {
    type: String,
    default:'No Plans'
 },
  resetPasswordToken: String,
  resetPassowrdExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(30).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPassowrdExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
