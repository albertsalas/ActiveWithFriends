const Activity = require("../models/Activity");
const response = require("../private/response");
const validRequest = require("../private/validRequest");

exports.findAll = (req, res) => {
    Activity.findAll((error, data) => {
        response("activities", "", data, error, res);
    });
}

exports.find = (req, res) => {
    Activity.find(req.params.id, (error, data) => {
        response("activity", req.params, data, error, res);
    });
}

exports.findEvent = (req, res) => {
    Activity.findEvent(req.params.id, (error, data) => {
        //response("activity", req.params, data, error, res);
        res.render("eventInfo", {data: data, title:"Event Information"});
    });
}

exports.findUserEvents = (req, res) => {
    Activity.findUserEvents(req.params.id, (error, data) => {
        //response("activity", req.params, data, error, res);
        res.send(data);
    });
}

exports.create = (req, res) => {
    var activity = new Activity(req.body);
    if (!validRequest(activity, res)) return;

    Activity.create(activity, (error, data) => {
        response("activity", req.body, data, error, res);
    });
}

exports.update = (req, res) => {
    var activity_id = req.body.id;
    var activity = new Activity({
        type_id: req.body.type_id,
        title: req.body.title,
        description: req.body.description,
        lng: req.body.lng,
        lat: req.body.lat,
        time: req.body.time,
    });

    if (!validRequest(Object.assign({id: activity_id}, activity), res)) return;

    Activity.update([activity, {id: activity_id}], (error, data) => {
        response("activity", req.body, data, error, res);
    });
}

exports.delete = (req, res) => {
    if (!validRequest(req.body.id, res)) return;

    Activity.delete({id: req.body.id}, (error, data) => {
        response("activity", req.body, data, error, res);
    });
}