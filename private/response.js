/**
 * The goal with this function is to reduce the amount of duplicate code.
 * Instead of having to create errors or responses for each controller method,
 * we can just call this function.
 * @param resource - string that specifies what resource is being acted upon
 * @param request - the original request body made by the client
 * @param query_response - database response
 * @param error
 * @param response - used to send a response to the client
 */
module.exports = (resource, request, query_response, error, response) => {
    // used for when the resource doesn't exist
    if (query_response.length === 0 || query_response.affectedRows === 0) {
        response.status(404).send({
            error: `Could not find ${resource}.`,
            request: request
        });
        return;
    }

    // successful PUT/POST/DELETE
    if (query_response.affectedRows >= 1) {
        response.status(200).send({
            message: `success`,
            data: request
        });
    }

    // successful GET
    if (query_response.length >= 1) {
        response.status(200).send({message: `Successfully retrieved ${resource}`, data: query_response});
        return;
    }

    // catch-all error
    if (error) {
        response.status(500).send({error: `Something went wrong with the server.`});
    }
};
