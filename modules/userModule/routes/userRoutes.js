// Import the Express module
const express = require("express");

// Import controller functions from userController module
const { formCreation, formFilling, formList } = require("../controller/userController");

// Create a new router instance
const routes = express.Router();

// Define routes and associate them with corresponding controller functions
routes.post("/form", formCreation); // Route for form creation
routes.post("/fill_data", formFilling); // Route for filling form data
routes.get("/fill_data", formList); // Route for getting form data

// Export the router instance
module.exports = routes;
