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
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: "User registratiion is failed"});
        } else {
            res.json({success: true, msg: "User registration is accomplished"});
        }
    });
});

// './authenticate' POST route
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) { throw err; }
        if (!user) {
            res.json({success: false, msg: "User is not found."});
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
                res.json({success: false, msg: "Password does not match."});
            }
        });
    });
});

// './profile' GET route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(req);
    res.json({user: req.user});
});

// exporting routes
module.exports = router;