// Importing environment variables
require("dotenv").config();

// Importing packages/external libraries
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const express = require("express"); // Express web framework
const bodyParser = require('body-parser'); // Parse incoming request bodies

// Accessing environment variables
const APP_PORT = process.env.APP_PORT; // Port on which the app will run
const BASE_URL = process.env.BASE_URL; // Base URL of the app
const APP_NAME = process.env.APP_NAME; // Name of the app

// Importing app files/functions/methods
const routes = require("./routes/api"); // Importing route file to access endpoints
const { connectionCheck } = require("./helpers/connectionCheck/dbConnectionCheck"); // Function to check database connections

// Importing database connections
const master_connection = require("./connections/master_connection"); // Master database connection
const slave_connection = require("./connections/slav_connection"); // Slave database connection

// Initiating Express app
const app = express();

// Allowing CORS restrictions
app.use(cors({ origin: '*' }));

// Parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining routes
app.use("/user-api", routes); // Routes related to user API

// Handling unknown routes with a 404 message
let jsonParser = bodyParser.json();
app.get('*', jsonParser, function (req, res) {
    res.send('404 Page'); // Sending 404 response for unknown routes
});

// Starting the server and listening for incoming requests
app.listen(APP_PORT, function () {
    console.log(`${APP_NAME} is listening at ${BASE_URL}${APP_PORT}`); // Logging server start message
    connectionCheck(master_connection, "Master DB"); // Checking connection to master database
    connectionCheck(slave_connection, "Slave DB"); // Checking connection to slave database
});
