/*
  Function to generate API response with status, message, and optional data.
  
  Parameters:
    - res: Response object from Express.js
    - type: Type of response, default is 'failed'
    - msg: Message to be included in the response, default is an empty string
    - data: Optional data to be included in the response, default is an empty array
  
  Returns:
    - JSON response with appropriate HTTP status code
  
  Notes:
    - The function uses a status map to map response types to HTTP status codes.
    - If the provided type is not found in the status map, a default status code of 500 is used.
    - The response data object includes 'status' and 'message' fields, and if the type is not 'failed', it includes a 'data' field as well.
    - The function sends the response using the Express.js response object's status and json methods.
*/
function mainApiResponse(res, type = 'failed', msg = '', data = []) {
    let status;
    let statusMap = {
        'success': 200,
        'no-route': 404,
        'validation': 400,
        'unauthorized': 401,
        'failed': 200,
    };

    if (statusMap.hasOwnProperty(type)) {
        status = statusMap[type];
    } else {
        status = 500;
    }

    let resData = {
        status: type === 'success' ? 'success' : 'failed',
        message: msg,
    };

    if (type !== 'failed') {
        resData.data = data;
    }

    return res.status(status).json(resData);
}


module.exports = {
    mainApiResponse
}