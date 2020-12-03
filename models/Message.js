const query = require('../private/query');

/**
 *
 * @param message
 * @constructor
 */
const Message = function (message) {
    this.sender_id = message.sender_id;
    this.receiver_id = message.receiver_id;
    this.sent_at = message.sent_at;
    this.contents = message.contents;
}

/**
 * Retrieves all messages between two users.
 * @param messageData
 * @param result
 */
Message.find = (messageData, result) => {
    var sender_id = messageData.sender_id;
    var receiver_id = messageData.receiver_id;
    query(
        `SELECT * FROM Message WHERE 
            (sender_id = ${sender_id} AND receiver_id = ${receiver_id})
            OR
            (sender_id = ${receiver_id} AND receiver_id = ${sender_id})            
            ORDER BY sent_at;`,
        [messageData.sender_id, messageData.receiver_id], (error, res) => {
            result(error, res);
        }
    );
}

Message.create = (message, result) => {
    query("INSERT INTO Message SET ?", message, (error, res) => {
        result(error, res);
    });
}

module.exports = Message;