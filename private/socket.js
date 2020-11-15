var socket_io = require('socket.io');
var io = socket_io();
var socket = {};
socket.io = io;

var userSocketIds = {};

io.on("connection", (socket) => {
    console.log("A user has connected!");
    socket.on("login", userId => {
        userSocketIds[userId] = socket.id;
    });

    // TODO: add functionality for when a user is offline
    socket.on("send", (data) => {
        let receiverId = userSocketIds[data.receiver];
        socket.broadcast.to(receiverId).emit("incoming", data);
    });
});

module.exports = socket;