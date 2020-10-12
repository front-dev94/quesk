const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Auth middleware
const auth = require("./app/middleware/auth.middleware.js");

// importing routes
const userRoutes = require('./app/routes/user.routes.js');
const authRoutes = require('./app/routes/auth.routes.js');
const questionRoutes = require('./app/routes/question.routes.js');
const answerRoutes = require('./app/routes/answer.routes.js');

app.use(cors());
app.use('/api/auth', [authRoutes]);
app.use('/api/dashboard', auth, [userRoutes, questionRoutes, answerRoutes]);

// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});