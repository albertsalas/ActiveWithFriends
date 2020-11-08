/**
 * The purpose of this function is to ensure that the request is valid
 * @param request
 * @param response
 * @returns {boolean} - if bad, return false, else true
 */
module.exports = (request, response) => {
    var errors = checkRequestForErrors(request);
    if (!request || errors) {
        response.status(400).send({error: errors})
        return false;
    }
    return true;
}

/**
 * Helper method used to check the request and its fields
 * @param request
 * @returns errors - JSON object with errors
 */
const checkRequestForErrors = (request) => {
    var errors = {}
    if (!request) {
        errors = "Request is completely empty!";
    }
    for (var key in request) {
        if (!request[key]) {
            errors[key] = "cannot be empty!";
        }
    }
    return errors;
}
