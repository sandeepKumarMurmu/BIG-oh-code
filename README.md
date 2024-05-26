BIG-OH USER

Big-OhUser is a comprehensive user management system empowering users to effortlessly create, fill, and edit custom forms. With the ability to seamlessly view user details and flexibly list all users, it offers a professional and efficient solution for effective user management.


tech stack :
    1. node.js
    2. javascript

npm packages :
    1. sequelize
    2. express.js
    3. express-validator
    4. mysql2
    5. uuid
    6. dotenv
    7. cors

databse intraction :
    1. SQL

version controll : 
    1. git

api / end pints : 
    1. /form (Create from)
    2. /fill_data?title = userName (fill out the form)
    3. /fill_data (list all user)
    4. /fill_data?titel=userName (list perticular user)

api explanation: 
    1. /form (Create from)
        Method: POST
        Body: {
                 "title": "meenusfs" //alphaNumaric with '_' 
               }
        Explanation: This endpoint enables users to create their forms by providing a title, which is a mandatory field.
        Validation Criteria: 
            1. Must contain minimum 4 character
            2. It can be alphaNumaric and also underScore ('_') allowed
            3. rejex used  /^[a-zA-Z0-9_.]+$/
        Validation Message: The title provided is invalid.
        Response: {
                    "status": "success",
                    "message": "User created successfully",
                    "data": {
                                "title": "sandeep_123",
                                "uniqueId": "bacb2902-acca-488a-ab92-adb37456dc9e"
                            }
                  }
    
    2. /fill_data?title = userName (fill out the form)
        Method: POST   
        Body: {
                "name": "Sandeep Kumar", // User name: alphabetical characters with single space
                "email": "sandeep@gmail.com", // Valid email
                "phonenumber": "9577224499", // Minimum 10 digits, numeric only
                "isGraduate": "false" // Boolean value only
              }
        Query: title // An alphanumeric character with underscore ('_') allowed.
        Explanation: This endpoint empowers users to fill out and edit the form with their details, ensuring that each field is compulsory.
        Validation Criteria: 
           1. 'Name' must consist of alphabetical characters, allowing both upper and lower case, with a single space permitted.
           2. 'Email' should be a valid email address and must contain a minimum of 8 characters.
           3. 'PhoneNumber' should be a minimum of 10 digits, accepting only numeric values.
           4. The 'isGraduate' field expects a boolean value only.
        validation-message : 
           1. title: The provided title is invalid.
           2. name: Invalid name format.
           3. email: Invalid email format.
           4. phonenumber: Invalid mobile number format.
           5. isGraduate: Invalid graduation status.
        Response: {
                    "status": "success",
                    "message": "User updated successfully",
                    "data": []
                  }
    
        2. /fill_data (list all user)
           Method: GET   
           Body: null
           Query: null
           Explanation: This endpoint allows users to retrieve a list of user details.
           Validation Criteria: null
           validation-message: null
           Response: {
                           "status": "success",
                           "message": "User fetched successfully",
                           "data": [
                                     {
                                         "unique_id": "2b5ee6e1-eccb-4386-808f-8526bd89d63d",
                                         "title": "meenu",
                                         "name": "-",
                                         "phonenumber": "-",
                                         "isGraduate": "False"
                                     },
                                     {
                                         "unique_id": "3a206f8e-141a-4863-bd2b-bf7a6f2e1e18",
                                         "title": "meenu1234",
                                         "name": "sandeep kumar",
                                         "phonenumber": "9577224499",
                                         "isGraduate": "False"
                                     }
                                   ]
                      }
        
         4. /fill_data?titel=userName 
             Method: GET   
             Body: null
             Query: title // An alphanumeric character with underscore ('_') allowed.
             Explanation: This endpoint allows users to retrieve details for a single user.
             Validation Criteria: Verifies the availability of the user.
             validation-message: null
             Response: {
                             "status": "success",
                             "message": "User fetched successfully",
                             "data": [
                                       {
                                           "unique_id": "2b5ee6e1-eccb-4386-808f-8526bd89d63d",
                                           "title": "meenu",
                                           "name": "-",
                                           "phonenumber": "-",
                                           "isGraduate": "False"
                                       }
                                     ]
                        }

link to postman collection : link