var connection = require("./connection");

// generate MySQL syntax
function printQuestionMarks(num) {
    var array = [];

    for (var i = 0; i < num; i ++) {
        array.push("?");
    }
    return array.toString();
}

// generate MySQL syntax
function objToSql(ob) {
    var array = [];

    for (var key in ob) {
        array.push(key + "=" + ob[key]);
    }
    return array.toString();
}

var orm = {

    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    
}

