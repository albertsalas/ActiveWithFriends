const Message = require("../models/Message");
const response = require("../private/response");
const validRequest = require("../private/validRequest");

exports.find = (req, res) => {
    var messageData = {
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id
    }
    if (!validRequest(messageData, res)) return;
    Message.find(messageData, (error, data) => {
        response("messages", req.body, data, error, res);
    });
}

exports.create = (req, res) => {
    var message = new Message(req.body);
    message.sent_at = new Date();
    if (!validRequest(message, res)) return;
    Message.create(message, (error, data) => {
        response("messages", req.body, data, error, res);
    });
}