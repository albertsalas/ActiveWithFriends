const socket = io();
const users = $("#users");
const messages = $("#messages");
const messageInput = $("#messageInput");
const inner = $("#inner");
var data = {
    sender: parseInt(userId)
};

socket.emit("login", userId);
const startChat = (receiver) => {
    if (data.receiver !== receiver.dataset.userid) {
        if (data.receiver) {
            messages.html("");
        }
        data.receiver = receiver.dataset.userid;
    }
    $("#receiver").text("Chatting with " + receiver.dataset.username);
    toggleChatContainer();
}

// this is so messages get send when hitting ENTER
messageInput.keydown(event => {
    if (event.which === 13) {
        send();
    }
})

// user is sending an outbound message
const send = () => {
    data.message = messageInput.val();
    messageInput.val("");
    if (!data.message || data.message.length ===0) {
        alert("CANNOT SEND EMPTY MESSAGE!");
        return;
    }
    addNMessageToContainer(data.message, "outbound");
    messageInput.focus();
    socket.emit("send", data);
}

// we add any incoming/outbound message to the chat box
const addNMessageToContainer = (message, direction) => {
    messages.append(
        `<div class="message-wrapper them">` +
                `<div class="text-wrapper ${direction}">${message}</div>` +
        `</div>`
    )
    inner.animate({
        scrollTop: inner[0].scrollHeight - inner[0].clientHeight
    }, 200);
}

// user is receiving an incoming message
socket.on("incoming", message => {
    alert("New message from " + message.sender);
    addNMessageToContainer(message.message, "inbound");
});

// when the page is finished loading, GET all users
$(document).ready(() => {
    $.get("/users", users => {
        for (let i in users.data){
            // ensure the sender isn't loaded into the users list
            if (data.sender === users.data[i].id) {
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

const toggleChatContainer = () => {
    // TODO: make this animated
    $(".activeChat").toggle();
    $(".userList").toggle();
}