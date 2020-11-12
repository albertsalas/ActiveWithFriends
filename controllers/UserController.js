const User = require("../models/User.js");
const response = require("../private/response");
const validRequest = require("../private/validRequest");

exports.findAll = (req, res) => {
    User.findAll((error, data) => {
        response("users", "", data, error, res);
    });
}

exports.find = (req, res) => {
    User.find(req.params.id, (error, data) => {
        response("user", req.params, data, error, res);
    });
}

// using to check for username availability
exports.findByUsername = (req, res) => {
    
    User.findByUsername(req.params.username, (error, data) => {
        if(data != undefined){
           if(data.length > 0){
               res.send(true)
           }
           else{
               res.send(false)
           }
        } 
        // response("user", req.params, data, error, res);
    });
}

// There should be only be 1 active(logged in) user.
exports.findByActive = (req, res) => {

    User.findByActive("?", (error, data) =>{
        if(data.length == 0){
            res.send(false)
        }
        else if(data.length > 1){
            res.send(false)
        }
        else if(data.length == 1){
            res.send(true)
        }
    })
}

exports.create = (req, res) => {
    var user = new User(req.body);
    if (!validRequest(user, res)) return;

    User.create(user, (error, data) => {
        response("user", req.body, data, error, res);
    });
};

exports.update = (req, res) => {
    var user_id = req.body.id;
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    if (!validRequest(Object.assign({id: user_id}, user), res)) return;

    User.update([user, {id: user_id}], (error, data) => {
        response("user", req.body, data, error, res);
    });
}

exports.delete = (req, res) => {
    if (!validRequest(req.body.id, res)) return;

    User.delete({id: req.body.id}, (error, data) => {
        response("user", req.body, data, error, res);
    });
}