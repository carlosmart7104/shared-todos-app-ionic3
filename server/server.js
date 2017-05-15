var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 
var databaseConfig = require('./config/database');
var router = require('./app/routes');

var connect = function () {
    mongoose.connect(databaseConfig.url);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error al abrir la base de datos - "+ error);
});
db.on('disconnected', connect);
 
app.listen(process.env.PORT || 8080);
console.log("listening on localhost port 8080");
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
 
router(app);