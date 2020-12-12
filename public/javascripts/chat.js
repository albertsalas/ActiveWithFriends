const socket = io();
const users = $("#users");
const messages = $("#messages");
const messageInput = $("#messageInput");
const inner = document.getElementById("inner");
var message = {
    sender_id: parseInt(userId)
};

socket.emit("login", userId);
const startChat = (receiver) => {
    messages.html("");
    message.receiver_id = receiver.dataset.userid;
    $("#receiver").text("Chatting with " + receiver.dataset.username);
    // retrieve all old messages
    $.ajax({
        type: "POST",
        url: "messages/find",
        dataType: "JSON",
        data: {sender_id: message.sender_id, receiver_id: message.receiver_id},
        success: result => {
            for (var i = 0; i < result.data.length; i++) {
                var outboundOrInbound = (result.data[i].sender_id === message.sender_id) ? "outbound" : "inbound";
                addMessageToContainer(result.data[i].contents, outboundOrInbound);
            }
        },
        done: toggleUsers()
    });
}

// this is so messages get sent when hitting ENTER
messageInput.keydown(event => {
    if (event.which === 13) {
        send();
    }
})

// user is sending an outbound message
const send = () => {
    message.contents = messageInput.val();
    messageInput.val("");
    if (!message.contents || message.contents.length === 0) {
        alert("CANNOT SEND EMPTY MESSAGE!");
        return;
    }
    $.post("/messages/create", message);
    addMessageToContainer(message.contents, "outbound");
    messageInput.focus();
    socket.emit("send", message);
}

// we add any incoming/outbound message to the chat box
const addMessageToContainer = (message, direction) => {
    messages.append(
        `<div class="message-wrapper them">` +
        `<div class="text-wrapper ${direction}">${message}</div>` +
        `</div>`
    )
    inner.scrollTop = inner.scrollHeight;
}

// user is receiving an incoming message
socket.on("incoming", message => {
    // TODO: add alerting within the chat window
    alert("New message from " + message.sender_id);
    console.log(message);
    addMessageToContainer(message.contents, "inbound");
});

// when the page is finished loading, GET all users
$(document).ready(() => {
    $.get("/users", users => {
        for (let i in users.data) {
            // ensure the sender_id isn't loaded into the users list
            if (message.sender_id === users.data[i].id) {
                continue;
            }
            let html = `<div class="user-wrapper" onclick="startChat(this)" data-userid="${users.data[i].id}" ` +
                `data-username="${users.data[i].username}">` +
                users.data[i].username +
                `</div>`
            $("#users").append(html);
        }
    });
});

const toggleUsers = () => {
    $(".activeChat").toggle();
    $(".userList").toggle();
}

const toggleChatContainer = () => {
    $("#chatContainer").toggle();
    $("#bubble").toggle();
}