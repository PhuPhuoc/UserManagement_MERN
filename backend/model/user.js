const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'tester'],
        required: true
    }
});

let User = mongoose.model("User", userSchema);
module.exports = User;