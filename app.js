var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session")
var app = express(); 
var socketio = require("socket.io")
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("views", __dirname + "/app/views");
app.set("view engine", "ejs");

//config static folder
app.use("/static", express.static(__dirname + "/public"))

var controllers = require(__dirname + "/app/controllers")

app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

var server = app.listen(port, host, function(){
    console.log("run on port 3000")
})

var io = socketio(server);