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
    Activity.findEvent(req.query.id, (error, data) => {
        //response("activity", req.params, data, error, res);
        Activity.checkJoined(req.query.id, req.session.userId, (error, joined) => {
            let check = (joined.length > 0) ? true : false;
            let host = (data[0].hostID == req.session.userId) ? true : false;
            res.render("eventInfo", {data: data, title:"Event Information", joined: check, host:host});
        });
        
    });
}


exports.findUserEvents = (req, res) => {
    if(req.session.userId){
        Activity.findUserEvents(req.session.userId, (error, data) => {
            //response("activity", req.params, data, error, res);
            res.render("profile", {data: data, title:"Profile"});
        });
    }
    else{
        res.redirect("/");
    }
}
    

exports.joinActivity = (req, res) => {
    Activity.joinActivity(req.session.userId, req.query.id, (error, data) => {
        let check = (data.length > 0) ? true : false;
        res.json({data: data, joined: check})
    });
}

exports.editActivity = (req, res) => {
    if(req.session.userId){
        Activity.editActivity(req.query.id, (error, data) => {
            if(req.session.userId == data[0].hostID){
                res.render("editActivity", {data: data, title:""})
            }
            else{
                res.redirect("/");
            }
        });
    }
    else{
        res.redirect("/");
    }
 
}

exports.create = (req, res) => {
    var activity = new Activity(req.body);
    if (!validRequest(activity, res)) return;
    if(req.session.userId){
        Activity.create(activity, req.session.userId , (error, data) => {
            response("activity", req.body, data, error, res);
        });
    }
 
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