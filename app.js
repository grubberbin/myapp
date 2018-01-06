var express = require('express');
var path = require('path');
var async = require('async');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var device = require('./routes/device');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


async.parallel([

        function (cb) {
            var mysql = require("mysql");
            var pool = mysql.createPool({
                connectionLimit: 5,
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: "mysqldb"
            });
            console.log("mysql poll is ready");
            cb(null, pool);
        }

    ],

    function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("All things is ready,start the server");
            app.db = data[0];
        }
    }
);


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', device);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
