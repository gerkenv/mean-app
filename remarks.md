# MEAN Application
Project is based on this video series,
https://www.youtube.com/watch?v=uONz0lEWft0&index=1&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ
So turn on and follow the instructions.

## Starting a MongoDB
Run database daemon `mongod` to start up the database server on 32-bit system:
```
mongod --dbpath ./mean/data --logpath .mean/data/log/logfile.txt --journal --storageEngine mmapv1
```
* `--storageEngine` - you can skip this parameter if you run the daemon on 64-bit system.
* `--logpath` - if parameter is not set, then log is streamed to the console, that opens the daemon.
* `--journal` is default active at 64-bit system.

## Express
### CORS
What is cross-origin resource sharing(CORS)? - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
You can enable CORS :
* manually - https://www.npmjs.com/package/cors
* with module - https://www.npmjs.com/package/cors

To enable CORS for all origins for all types of HTTP methods put line `app.use(cors());` in main express `app`.
```js
var express = require('express')
var cors = require('cors')
var app = express();

// enable CORS for all origins for all types of HTTP methods
app.use(cors());
```

### Routes
Easiest way to create a route is to allocate it in express main `app` script.
```js
var express = require('express');
var app = express();

// GET route for '/'
app.get('/', (req, res) => {
  res.send('Some response');
});
```
More sophisticated way is to put routes in different module, usually these modules are called the same as the namespace they represent.
```js
// ./routes/users.js
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
    // exporting routes
module.exports = router;

// ./app.js
const express = require('express');
const app = express();
    // '/users' routes
const users = require('./routes/users');
    // define namespace for `users` routes
app.use('/users', users);
```

## Angular 2
### Part 5
If you were to lazy to type code for parts 1-4, then you can take app from here https://github.com/bradtraversy/nodeauthapp.

At first install Angular command-line generator globally:
```
npm install angular-cli -g
```
Then we will generate standard application source structure into `mean/app/angular-src`.
```
cd ./mean/app
ng new angular-src
```
When the folder is generated we can change the output directory of our front-end app. Let's open `mean/angular-src/angular-cli.json` and change `outDir` to `../public`. This way our compiled app will become a public part of our express app.

To compile our sources and run the frontend server we should run following commands:
```
cd ./mean/app/angular-src
ng serve
```
If don't know anything about Angular 2, check out this video:
https://www.youtube.com/watch?v=-zW1zHqsdyc

Now we have our main component located here `mean/angular-src/src/app/app.component.ts`.

Let's create a folder to make our own components:
`mean/angular-src/src/app/components`.

Then we have to stop our frontend server and run:
```
cd mean/angular-src/src/app/components
ng g component navbar
```
To generate our `navbar` component.

What is also nice about generation of components, if you will look into `mean/angular-src/src/app/app.module.ts`. You will see that `NavbarComponent` was automatically imported and added to declarations of the main module.

So now we also need to create `login`, `register`, `dashboard`, `profile`.

When you create all components, connect them with the backend, then you can call
```
ng build
```
to compile all your TS code to JS and bundle it, after index.html and all your JS bundles will be copied to `mean/app/public` and served as static folder at home route.

