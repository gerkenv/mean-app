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
    username:  {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

User.getUserById = (id, callback) => {
    User.findById(id, callback);
};

User.getUserByUsername = (name, callback) => {
    const query = {username: name};
    User.findOne(query, callback);
};

User.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

User.comparePasswords = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch); 
    });
};

module.exports = User;