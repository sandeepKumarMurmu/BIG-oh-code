const express = require("express");

const { formCreation, formFilling, formList } = require("../controller/userController");

const routes = express.Router();

routes.post("/form", formCreation);
routes.post("/fill_data", formFilling);
routes.get("/fill_data", formList);

module.exports = routes;
