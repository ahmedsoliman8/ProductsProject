const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, maxlength: 40 },
    name: { type: String, required: true, maxlength: 40 },
    password: { type: String, maxlength: 100 },
    email: { type: String, maxLength: 40 },
    phone: { type: String, maxLength: 11 },
    gender: { type: String, maxLength: 1 }
});


module.exports = mongoose.model('User', userSchema, "users");