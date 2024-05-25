// Importing environment variables
require("dotenv").config();

// Importing packages/ external libraries
const cors = require('cors')
const express = require("express");
const bodyParser = require('body-parser');

// Accessing environment variables
const APP_PORT = process.env.APP_PORT;
const BASE_URL = process.env.BASE_URL;
const APP_NAME = process.env.APP_NAME;

// Importing app files / functions / methodes
const routes = require("./routes/api"); // specially in here route file is imported to access end points
const { connectionCheck } = require("./helpers/connectionCheck/dbConnectionCheck");

// importing db connections
const master_connection = require("./connections/master_connection");
const slave_connection = require("./connections/slav_connection");


// Initiating Express app
const app = express();

// Allowing cors ristriction
app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining routes
app.use("/user-api", routes);

// If any unknown rout is trying to accessed 404 message will delivered.
let jsonParser = bodyParser.json();
app.get('*', jsonParser, function (req, res) {
    res.send('404 Page');
});

// app listing function
app.listen(APP_PORT, function () {
    console.log(`${APP_NAME} is listening at ${BASE_URL}${APP_PORT}`);
    connectionCheck(master_connection, "Master DB");
    connectionCheck(slave_connection, "Slave DB");
})

