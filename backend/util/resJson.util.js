/**
 * Send json responce back to client
 * @param {*} res - express res
 * @param {*} code - responce code
 * @param {*} data - responce data
 * @param {*} message - responce message
 */
export function responceJson(res, code, data, message){
    const jsonObj = {};
    const httpStatus = {
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        203: 'Non-Authoritative Information',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not found',
        500: 'Internal Server Error',
        502: 'Bad Gateway'
    }
    //message sẽ thông báo thông tin cho
    jsonObj.code = code;
    jsonObj.message = message || httpStatus[code] || '';
    jsonObj.data = data || {};
    res.json(jsonObj);
}