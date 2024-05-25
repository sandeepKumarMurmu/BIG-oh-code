// importing from library
const { validationResult } = require("express-validator");

// importing method / fucntions
const { functionResponse } = require("./functionResponse");


/**
 * Validates the request parameters, body, and query.
 * @param {object} req - The request object containing the parameters, body, and query to be validated.
 * @returns {object} - The response object indicating the status of the validation and any error data.
 */
function validationResponse(req) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorData = errors.array().map((error) => {
                return { field: error.path, location: error.location, message: error.msg };
            });

            return functionResponse(false, "Invalid request data provided.", errorData);
        }

        return functionResponse(true, "Requested data validated successfully.", []);
    } catch (err) {
        return functionResponse(false, 'Request data validation failed.', []);
    }
}


module.exports = { validationResponse };