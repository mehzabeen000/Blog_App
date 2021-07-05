const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

var users = mongoose.model('user', userSchema)
module.exports = users;
