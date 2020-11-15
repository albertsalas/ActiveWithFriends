
const Message = function (message) {
    this.sender = message.sender;
    this.receiver = message.receiver;
    this.contents = message.contents;
}

module.exports = Message;