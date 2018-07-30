const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// '/users' routes
const users = require('./routes/users');

// port number
const port = 3000;

// enable CORS for all origins for all types of HTTP methods
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// enable body-parser middleware to parse HTML forms
app.use(bodyParser.json());

// define namespace for `users` routes
app.use('/users', users);

// '/' GET route
app.get('/', (req, res) => {
    res.send("Hello");
    res.end();
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});