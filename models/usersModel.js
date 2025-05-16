const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    balance: { type: Number, default: 0, require: true },
    resetCode: { type: Number }
});
const users_model = mongoose.model("users", schema);
module.exports = users_model;