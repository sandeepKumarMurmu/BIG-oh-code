// Import the Express module
const express = require("express");

// Import userRoutes from userModule
const userRoutes = require("../modules/userModule/routes/userRoutes");

// Create an Express application instance
const app = express();

// Mount userRoutes on the root path
app.use("/", userRoutes);

// Export the Express application instance
module.exports = app;