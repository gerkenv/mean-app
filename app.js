const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// get database configuration
const config = require('./config/database');

// establish connection to database
mongoose.connect(config.database);

// add event listener to 'connection' event
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// add event listener to 'error' event
mongoose.connection.on('error', (err) => {
    console.log('Database error:\n' + err);
});

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

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// define namespace for `users` routes
app.use('/users', users);

// '/' home GET route
app.get('/', (req, res) => {
    res.send("Hello");
    res.end();
});

// redirect all unknown requests to home page
app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});