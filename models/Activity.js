const query = require('../private/query');

const Activity = function (activity) {
    this.type_id = activity.type_id;
    this.location = activity.location;
    this.time = activity.time;
    this.description = activity.description;
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

module.exports = Activity;