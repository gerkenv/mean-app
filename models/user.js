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
        required: true
    },
    username:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (name, callback) => {
    const query = {username: name};
    User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            console.log(">>> newUser");
            console.log(newUser);
            console.log(">>> newUser");
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePasswords = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.validateString = (str) => {
    if ((str === undefined) || (str === null) || (str === '')) {
        return false;
    }
    return true;
};

module.exports.isUsernameAvailable = (username, callback) => {
    User.getUserByUsername(username, (err, result) => {
        if (err) { throw err; }
        if (result !== null) { callback(null, false); }
        callback(null, true);
    });
};