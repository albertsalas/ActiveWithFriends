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

    socket.on("send", (data) => {
        let receiver_id = userSocketIds[data.receiver_id];
        socket.broadcast.to(receiver_id).emit("incoming", data);
    });
});

module.exports = socket;