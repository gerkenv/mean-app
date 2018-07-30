const express = require('express');
const router = express.Router();

// './register' GET route
router.get('/register', (req, res, next) => {
    res.send('GET register user');
});

// './authenticate' GET route
router.get('/authenticate', (req, res, next) => {
    res.send('GET authenticate user');
});

// './profile' GET route
router.get('/profile', (req, res, next) => {
    res.send('GET profile user');
});

// './validate' GET route
router.get('/validate', (req, res, next) => {
    res.send('GET validate user');
});

// exporting routes
module.exports = router;