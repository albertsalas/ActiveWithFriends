const Message = require("../models/Message");
// const response = require("../private/response");
const validRequest = require("../private/validRequest");

exports.create = (req, res) => {
    var message = new Message(req.body);
    if (!validRequest(message, res)) return;
    // for now we'll avoid storing it in the DB
    res.status(200).send({message:message});
}