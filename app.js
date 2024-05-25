// Importing environment variables
require("dotenv").config();

// Importing packages/ external libraries
const cors = require('cors')
const express = require("express");
const bodyParser = require('body-parser');

// Accessing environment variables
const APP_PORT = process.env.APP_PORT;
const BASE_URL = process.env.BASE_URL;

// Importing app files 
// specially in here route file is imported to access end points
const routes = require("./routes/api");

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
    console.log(`Examples app listening at ${BASE_URL}${APP_PORT}`)
})

