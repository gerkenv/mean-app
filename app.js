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

// 1st '/' home GET route
// set static folder to home '/' route
app.use(express.static(path.join(__dirname, 'public')));
// following two are working the same way
// app.use('', express.static(path.join(__dirname, 'public')));
// app.use('/', express.static(path.join(__dirname, 'public')));

// enable body-parser middleware to parse HTML forms
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// define namespace for `users` routes
app.use('/users', users);

// 2nd '/' home GET route
// not used, because static folder `public` is served at 1st `home `route
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