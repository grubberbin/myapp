var mysqlclient = require('../database/mysqlclient').prototype;
var location = require('../database/location');
var sd = require('silly-datetime');

var device_location = {};

device_location.savedata = function (gps_data, callback) {

    var date = sd.format(new Date(), "YYYY-MM-DD HH:mm");

    location.init(gps_data[1], gps_data[0], gps_data[3], gps_data[4], gps_data[2], date);
    mysqlclient.insert(location, function (err, data) {
        if (err) {
            callback(err, data);
        } else {
            callback(null, data);
        }
    });
},

    module.exports = device_location;