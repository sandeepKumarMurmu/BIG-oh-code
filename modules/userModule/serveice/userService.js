// import from external library
const { DataTypes, or } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

// Importing methodes / functions
const { mainApiResponse } = require("../../../helpers/responses/apiResponse");
const { functionResponse } = require("../../../helpers/responses/functionResponse");
const { validationResponse } = require("../../../helpers/responses/validationResult");


// import db connection
const MASTER_DB = require("../../../connections/master_connection");
const SLAVE_DB = require("../../../connections/slav_connection");


/**
 * Middleware function to handle request body validations validation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function validationMiddle(req, res, next) {
    try {
        // Validate the request using validationResponse function
        const validationResult = await validationResponse(req);

        // If validation fails
        if (!validationResult.status) {
            // Extract validation error messages
            const validationMessage = validationResult?.data?.map(ele => ele.message);
            // Send validation failed response
            return mainApiResponse(res, 'validation', validationMessage.join(", "), []);
        }
        // Proceed to the next middleware or route handler
        next();
    }
    catch (err) {
        // Handle unexpected errors
        return mainApiResponse(res, 'failed', "Body validation failed.", []);
    }
}


/**
 * Controller function to handle user creation.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function userController(req, res) {
    try {
        // Extract title from request body
        const { title = "" } = req.body;

        // Check if user with the provided title already exists
        const existingData = await findUser({ title: title }, [], true, []);

        // If user with the provided title already exists, return failure response
        if (existingData?.status && existingData?.data?.length) {
            return mainApiResponse(res, "failed", "Title already exists.", []);
        }

        // Prepare object to create new user
        const create_obj = {
            uniqueId: uuidv4(),
            title
        }

        // Create new user
        const create_data = await createUser(create_obj);

        // If user creation fails, return failure response
        if (!create_data.status) {
            return mainApiResponse(res, "failed", create_data?.msg, []);
        }

        // If user creation is successful, return success response with user data
        return mainApiResponse(res, "success", create_data?.msg, { title: create_data?.data?.title, uniqueId: create_data?.data?.uniqueId });
    }
    catch (err) {
        // Return an error response if an error occurs
        return mainApiResponse(res, 'failed', err?.message, []);
    }
}


/**
 * Create a new user with the provided/validated data.
 * @param {Object} create_obj - Object containing data to create the user
 * @returns {Object} - Object containing the response status, message, and data
 */
async function createUser(create_obj = {}) {
    try {
        // Check if create_obj is empty
        if (!Object.keys(create_obj)?.length) {
            // Return an error response if create_obj is empty
            return functionResponse(false, "Invalid data provided to create user.", []);
        }

        // Prepare the object with required fields
        const obj = {
            uniqueId: create_obj?.uniqueId ? create_obj?.uniqueId : null,
            title: create_obj?.title?.trim() ? create_obj?.title?.trim() : null
        }

        // Import the master_user model
        const master_user = require("../../../modles/master_user")(MASTER_DB, DataTypes);

        // Create a new user with the provided data
        const data = await master_user.create(obj);

        // Return a success response with the created user data
        return functionResponse(true, "User created successfully", data)
    }
    catch (err) {
        // Return an error response if an error occurs during user creation
        return functionResponse(false, err?.message, []);
    }
}


/**
 * Find users based on the provided criteria.
 * @param {Object} where_obj - Object containing conditions for filtering users
 * @param {Array} attribute_arr - Array containing attributes to include in the result
 * @param {boolean} raw - Boolean flag to indicate whether to return raw data or not
 * @param {string|Array} order_by - Sorting order for the results
 * @returns {Object} - Object containing the response status, message, and data
 */
async function findUser(where_obj = {}, attribute_arr = [], raw = false, order_by = '') {
    try {
        // Import the master_user model
        const master_user = require("../../../modles/master_user")(SLAVE_DB, DataTypes);

        // Prepare the condition object for the query
        const condition_obj = {
            where: { ...where_obj },
            raw
        };

        // Include specified attributes in the result
        if (attribute_arr?.length) {
            condition_obj.attributes = attribute_arr;
        }

        // Apply ordering to the results
        if (order_by?.length && typeof order_by === 'object') {
            condition_obj.order = order_by;
        }

        // Find users based on the condition object
        const data = await master_user.findAll({ ...condition_obj });

        // Return a success response with the fetched user data
        return functionResponse(true, "User fetched successfully", data)
    }
    catch (err) {
        // Return an error response if an error occurs during user fetching
        return functionResponse(false, err?.message, []);
    }
}

// exporting fucntion
module.exports = {
    validationMiddle,
    userController
}