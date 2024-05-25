const express = require("express");

const userRoutes = require("../modules/userModule/routes/userRoutes");


const app = express();

app.use("/", userRoutes);

module.exports = app;