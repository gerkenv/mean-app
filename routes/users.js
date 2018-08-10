const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

// './authenticate' GET route
router.get('/authenticate', (req, res, next) => {
    res.send('GET authenticate user');
});

// './profile' GET route
router.get('/profile', (req, res, next) => {
    res.send('GET profile user');
});

// exporting routes
module.exports = router;