// Importing from library
const { body, query } = require("express-validator");

// rejex / constant values
const USER_NAME_REJEX = /^[a-zA-Z0-9_.]+$/; //

// importing function / methodes to 
const { validationMiddle, userController, userUpdateController } = require("../serveice/userService");

/*
  Array containing middleware functions for form creation validation and user controller.

  Middleware:
    - Validates the 'title' field of the form:
      - Trims the input and checks if it has a minimum length of 4 characters.
      - Uses the 'withMessage' method to set a custom error message if the title is invalid.
      - Uses the 'bail' method to stop validation chain on first validation failure.
      - Custom validation function checks if the title matches the USER_NAME_REJEX regular expression.
      - If the title does not match the regular expression, it returns a custom error message.
    - 'validationMiddle' middleware function (assuming it's defined elsewhere).
    - 'userController' middleware function responsible for handling user-related actions.

  Notes:
    - This array represents the middleware stack to be executed in sequence during form creation.
    - If the validation for the 'title' field fails, subsequent middleware will not be executed due to the 'bail' method.
    - The 'validationMiddle' middleware likely contains additional validation logic or error handling.
    - The 'userController' middleware handles the form creation process or other user-related actions.
*/
const formCreation = [
    body("title").trim().isLength({ min: 4 }).withMessage("Invalid title.").bail().custom((title) => {
        if (!USER_NAME_REJEX.test(title)) {
            return false;
        }
        return true;
    }).withMessage("Invalid title."),
    validationMiddle, // Assuming this is defined elsewhere
    userController // Assuming this is defined elsewhere
];



/*
  Middleware array for validating form filling data and handling user update controller.

  Middleware:
    1. Validates the 'title' query parameter:
      - Trims the input and checks if it has a minimum length of 4 characters.
      - Uses 'custom' validation to check if the title matches the USER_NAME_REJEX regular expression.
      - Sets custom error messages for invalid inputs.

    2. Validates the 'name' field in the request body:
      - Trims the input and checks if it has a minimum length of 3 characters.
      - Uses 'isAlpha' validation to check if the name contains only alphabetic characters and single spaces.
      - Sets custom error messages for invalid inputs.

    3. Validates the 'email' field in the request body:
      - Trims the input and checks if it has a minimum length of 8 characters.
      - Uses 'isEmail' validation to check if the input is a valid email address.
      - Sets custom error messages for invalid inputs.

    4. Validates the 'phonenumber' field in the request body:
      - Trims the input and checks if it has a minimum length of 10 characters.
      - Uses 'isMobilePhone' validation to check if the input is a valid mobile phone number.
      - Sets custom error messages for invalid inputs.

    5. Validates the 'isGraduate' field in the request body:
      - Trims the input and checks if it is a valid boolean value.
      - Sets custom error messages for invalid inputs.

    6. Includes a validation middleware (assuming it's defined elsewhere).

    7. Includes the user update controller middleware (assuming it's defined elsewhere).
  
  Notes:
    - Each validation step is chained using methods like 'trim', 'isLength', 'isAlpha', 'isEmail', 'isMobilePhone', etc.
    - Custom error messages are set using the 'withMessage' method.
    - The 'validationMiddle' middleware likely contains additional validation logic or error handling.
    - The 'userUpdateController' middleware handles the user update process.
*/
const formFilling = [
    query("title").trim().isLength({ min: 4 }).withMessage("Invalid title.").bail().custom((title) => {
        if (!USER_NAME_REJEX.test(title)) {
            return false;
        }
        return true;
    }).withMessage("Invalid title."),
    body("name").trim().isLength({ min: 3 }).withMessage("Invalid name format.").bail().isAlpha('en-US', { ignore: ' ' }).withMessage("Invalid name format."),
    body('email').trim().isLength({ min: 8 }).withMessage("Invalid email format.").bail().isEmail().withMessage("Invalid email format1"),
    body("phonenumber").trim().isLength({ min: 10 }).withMessage("Ivalid mobile number format.").bail().isMobilePhone('any', { strictMode: false }).withMessage("Invalid mobile number."),
    body('isGraduate').trim().isBoolean().withMessage("Invlaid graduation status."),
    validationMiddle, // Assuming this is defined elsewhere
    userUpdateController // Assuming this is defined elsewhere
];



const formList = [
    async (req, res) => {
        return res.json({ message: "From listed successfully." })
    }
]


module.exports = {
    formCreation,
    formFilling,
    formList
}