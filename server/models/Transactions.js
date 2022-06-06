const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

require("dotenv").config()

const TransactionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        default: 'Deposit' // deposit   // withdraw //bonus
    },
    status: {
        type: String,
        required: true,
        default: 'Pending' // pending // received //failed
    },

    amount: {
        type: Number,
        required: true,
        default: 0
    },
    address: {
        type: String,
    },
     date: {
         type: Date,
         default: Date.now
     },
});



const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
