// Importing from library
const { body } = require("express-validator");

// rejex / constant values
const USER_NAME_REJEX = /^[a-zA-Z0-9_.]+$/; //

// importing function / methodes to 
const { validationMiddle, userController } = require("../serveice/userService");

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



const formFilling = [
    async (req, res) => {
        return res.json({ message: "From Filled successfully." })
    }
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