const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const userSchema = mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
        required: true,
    },
    login:  {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByName = (name, callback) => {
    const query = {name: name};
    User.findOne(query, callback);
};