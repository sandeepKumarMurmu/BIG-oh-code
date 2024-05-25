require('dotenv').config();
// importing from library
const Sequelize = require('sequelize');

// accessing environment variables
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST_SLAVE;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

//making db connection
var slave_connection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: true,
        timezone: '+05:30'
    });

module.exports = slave_connection;