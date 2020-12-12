const query = require('../private/query');

const Activity = function (activity) {
    this.type_id = activity.type_id;
    this.title = activity.title;
    this.description = activity.description;
    this.lng = activity.lng;
    this.lat = activity.lat;
    this.time = activity.time;
}

Activity.findAll = (result) => {
    query("SELECT * FROM Activity", "", (error, res) => {
        result(error, res);
    });
}

Activity.find = (activity_id, result) => {
    query("SELECT * FROM Activity WHERE id = ?", activity_id, (error, res) => {
        result(error, res);
    });
}

Activity.findEvent = (activity_id, result) => {
    query("SELECT id, title, description, lng, lat, hostID, DATE_FORMAT(time, '%h:%i %p - %d %b %Y') as time FROM Activity WHERE id = ?", activity_id, (error, res) => {
        result(error, res);

    });
}

Activity.checkJoined = (activity_id, user_id, result) => {
    // if(user_id){
        query("SELECT * FROM JoinedActivities WHERE activityID = ? AND userID = ?", [activity_id, user_id], (error, res) => {
            result(error, res);
        });
    // }
}

Activity.findUserEvents = (user_id , result) => {
    query("SELECT JoinedActivities.activityID, Activity.title, Activity.description, Activity.time FROM JoinedActivities INNER JOIN Activity ON JoinedActivities.activityID = Activity.id WHERE JoinedActivities.userID = ?", user_id, (error, res) => {
        result(error, res);
    });
}

Activity.create = (activity, result) => {
    query("INSERT INTO Activity SET ?", activity, (error, res) => {
        result(error, res);
    });
}

Activity.update = (activity, result) => {
    query("UPDATE Activity SET ? WHERE ?", activity, (error, res) => {
       result(error, res);
    });
}

Activity.delete = (activity, result) => {
    query("DELETE FROM Activity WHERE ?", activity, (error, res) => {
       result(error, res);
    });
}

Activity.joinActivity = (user_id, activity_id , result) => {
    query("SELECT * FROM JoinedActivities WHERE activityID = ? AND userID = ? ", [activity_id, user_id], (error, res) => {
        if(user_id){
            if(res.length > 0){
                query("DELETE FROM JoinedActivities WHERE activityID = ? AND userID = ? ", [activity_id, user_id], (error, res) => {
                });
            }
            else{
                query("INSERT INTO JoinedActivities SET activityID = ? , userID = ? ", [activity_id, user_id], (error, res) => {
                });
            }
        }
    
        
        result(error, res);
    });
}

Activity.editActivity = (user_id, activity_id , result) => {
    
        query("SELECT id, title, description, lng, lat, hostID, DATE_FORMAT(time, '%Y-%m-%dT%h:%i') as time FROM Activity WHERE id = ? AND hostID = ? ", [activity_id, user_id], (error, res) => {

            result(error, res);
        });
    

}

module.exports = Activity;