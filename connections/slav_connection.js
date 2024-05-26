require('dotenv').config(); // Load environment variables from .env file

// Importing necessary libraries
const Sequelize = require('sequelize');

// Accessing environment variables for database configuration
const DB_USERNAME = process.env.DB_USERNAME; // Database username
const DB_PASSWORD = process.env.DB_PASSWORD; // Database password
const DB_HOST = process.env.DB_HOST_SLAVE; // Database host
const DB_PORT = process.env.DB_PORT; // Database port
const DB_DATABASE = process.env.DB_DATABASE; // Database name

// Creating a new Sequelize connection instance for the slave database
const slave_connection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql', // Using MySQL dialect
    logging: true, // Enable logging
    timezone: '+05:30' // Set timezone
});

// Exporting the Sequelize connection instance for the slave database
module.exports = slave_connection;
