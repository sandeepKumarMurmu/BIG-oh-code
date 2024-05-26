require("dotenv").config(); // Load environment variables from .env file

// // Accessing environment variables
// const IS_CODING_ENV_DEV = process.env.CODING_ENV == "dev" ? true : false; // Check if the environment is development

/**
 * Checks the connection to a database and logs the result.
 * @param {Object} db - The database object to check the connection for.
 * @param {string} name - The name of the database (used for logging purposes).
 */
function connectionCheck(db, name) {
    db.authenticate().then(
        () => {
            console.log(`${name} Db connected successfully.....................`); // Log successful connection
        }
    ).catch((err) => {
        console.log(`Unable to connect ${name} db............................`); // Log failed connection
        console.log("err : ", err); // Log error if in development environment
    });
}

// Export the connectionCheck function
module.exports = {
    connectionCheck
}
