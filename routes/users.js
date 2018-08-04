const express = require('express');
const router = express.Router();
const user = require('../models/user');
const passport = require('passpoer');
const jwt = require('jsonwebtoken');

// './register' POST route
router.post('/register', (req, res, next) => {
    let newUser = new user({
        name: req.body.name,

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