var mysqlpool=require('../app').db;
//var mysql = require("mysql");
var errormsg = require("./errormsg.js");

/*
var mysqlpool = mysql.createPool({
    connectionLimit: 5,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: "mysqldb"
});
*/

var mysqlclient = {};

mysqlclient.prototype = function () {

};

mysqlclient.prototype.query = function (sql, values, callback) {

    mysqlpool.query(sql, values, function (err, rows) {
        if (err) {
            console.log(err);
            callback.call(this, err, {err: 3001, msg: errormsg.errorcode["3001"]})
        } else {
            callback.call(this, null, rows);
        }
    });
};

mysqlclient.prototype.insert = function (obj, callback) {

    var tablename = "";
    var keys = "";
    var values = "";
    var wildcard = "";
    var i = 0;
    for (var key in obj) {

        if (typeof (obj[key]) != 'function' && typeof (obj[key]) != 'object') {
            if (i == 0) {
                keys += key;
                values += obj[key];
                wildcard += "?"
            } else {
                keys += "," + key;
                values += "," + obj[key];
                wildcard += ",?";
            }
            i++;
        }
        if (typeof (obj[key]) == 'object' && key == "MapTable") {
            tablename = obj[key].tablename;
        }
    }
    var sql = "insert into " + tablename;
    sql += " ( " + keys + " ) values ( " + wildcard + " )";

    var parms = values.split(',');

    this.query(sql, parms, function (err, data) {
        callback.call(this, err, data);
    });
}

mysqlclient.prototype.getentity = function (obj, callback) {

    var selectfileds = "";
    var tablename = "";
    var primarykey = "";
    var i = 0;
    for (var key in obj) {

        if (typeof (obj[key]) != 'function' && typeof (obj[key]) != 'object') {
            if (i == 0) {
                selectfileds += key;

            } else {
                selectfileds += "," + key;
            }
            i++;
        }
        if (typeof (obj[key]) == 'object' && key == "MapTable") {
            tablename = obj[key].tablename;
            primarykey = obj[key].primarykey;
        }
    }
    var sql = " select " + selectfileds + " from " + tablename + " where " + primarykey + "=?";
    var keyval = obj[primarykey];
    if (keyval) {
        this.query(sql, keyval, function (err, data) {
            callback.call(this, err, data);
        })
    } else {
        callback.call(this, null, {err: 3002, msg: errormsg.errorcode["3002"]});
    }
}


mysqlclient.prototype.delete = function (obj, callback) {

    var tablename = "";
    var primarykey = "";
    var i = 0;
    for (var key in obj) {

        if (typeof (obj[key]) == 'object' && key == "MapTable") {
            tablename = obj[key].tablename;
            primarykey = obj[key].primarykey;
        }
    }
    var sql = " delete from  " + tablename + " where " + primarykey + "=?";
    var keyval = obj[primarykey];
    if (keyval) {
        this.query(sql, keyval, function (err, data) {
            callback.call(this, err, data);
        })
    } else {
        callback.call(this, null, {err: 3002, msg: errormsg.errorcode["3002"]});
    }

}

mysqlclient.prototype.update = function (obj, callback) {
    var tablename = "";
    var keys = "";
    var values = "";
    var i = 0;
    for (var key in obj) {

        if (typeof (obj[key]) != 'function' && typeof (obj[key]) != 'object') {
            if (i == 0) {
                keys += key + "=?";
                values += obj[key];

            } else {
                keys += "," + key + "=? ";
                values += "," + obj[key];
            }
            i++;
        }
        if (typeof (obj[key]) == 'object' && key == "MapTable") {
            tablename = obj[key].tablename;
            primarykey = obj[key].primarykey;
        }
    }

    var sql = "update " + tablename + " set ";

    sql += "  " + keys + "  where " + primarykey + "=?";

    var keyval = obj[primarykey];

    if (keyval) {
        values += "," + keyval;
        var parms = values.split(',');
        this.query(sql, parms, function (err, data) {
            callback.call(this, err, data);
        });
    } else {
        callback.call(this, null, {err: 3002, msg: errormsg.errorcode["3002"]});
    }

}


mysqlclient.prototype.getentityByCondition = function (obj, callback) {

    var selectfileds = "";
    var tablename = "";
    var primarykey = "";
    var values = [];
    var keys = "";
    var wildcard = "";
    var i = 0;
    for (var key in obj) {
        if (obj[key] && typeof (obj[key]) != 'function' && typeof (obj[key]) != 'object') {
            if (i == 0) {
                keys += key;
                values.push(obj[key])
                wildcard += " AND " + key + " = ? "
            } else {
                keys += "," + key;
                values.push(obj[key])
                wildcard += " ,AND " + key + " = ? "
            }
            i++;
        }
        if (typeof (obj[key]) == 'object' && key == "MapTable") {
            tablename = obj[key].tablename;
        }
    }
    var sql = " select * from " + tablename + " where 1=1 ";
    sql += wildcard;
    this.query(sql, values, function (err, data) {
        callback.call(this, err, data);
    });
}

module.exports = mysqlclient;
