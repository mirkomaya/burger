var connection = require("../config/connection");

// generate MySQL syntax
function printQuestionMarks(num) {
    var array = [];

    for (var i = 0; i < num; i++) {
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

        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    insertOne: function (table, cols, vals, cb) {

        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function (err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    },
    // Function that updates a single table entry
    updateOne: function (table, objColVals, condition, cb) {
        // Construct the query string that updates a single entry in the target table
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        // console.log(queryString);

        // Perform the database query
        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(res);
        });
    }
};

// Export the orm object for use in other modules
module.exports = orm;
