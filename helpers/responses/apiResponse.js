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