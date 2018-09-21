const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

// './register' POST route
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // validate name
    if (false === User.validateString(newUser.name)) {
        res.json({success: false, msg: "Enter a name"});
        return;
    }

    // validate username
    if (false === User.validateString(newUser.username)) {
        res.json({success: false, msg: "Enter an username"});
        return;
    }

    // validate email
    if (false === User.validateString(newUser.email)) {
        res.json({success: false, msg: "Enter an email"});
        return;
    }

    // validate password
    if (false === User.validateString(newUser.password)) {
        res.json({success: false, msg: "Enter a password"});
        return;
    }

    // check username availability
    User.isUsernameAvailable( newUser.username, (err, isAvailable) => {
        if (err) throw err;
        if (!isAvailable) {
            res.json({success: false, msg: "The username is busy"});
            return;
        }
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: "The registration is failed"});
        } else {
            res.json({success: true, msg: "The registration is accomplished"});
        }
    });
});

// './authenticate' POST route
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // validate username
    if (false === User.validateString(username)) {
        res.json({success: false, msg: "Enter the username"});
        return;
    }

    User.getUserByUsername(username, (err, user) => {
        if (err) { throw err; }
        if (!user) {
            res.json({success: false, msg: "Username is not found"});
            return;
        }

        // validate password
        if (false === User.validateString(password)) {
            res.json({success: false, msg: "Enter the password"});
            return;
        }

        User.comparePasswords(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

                const plainUser = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                };
                // console.log(user);
                // const token = jwt.sign(user, config.secret, {
                    const token = jwt.sign(plainUser, config.secret, {
                    expiresIn: 604800 // [s] 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: plainUser
                });
            } else {
                res.json({success: false, msg: "Invalid credentials"});
            }
        });
    });
});

// './profile' GET route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(">>> req");
    console.log(req);
    console.log(">>> req");
    res.json({user: req.user});
});

// exporting routes
module.exports = router;