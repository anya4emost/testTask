var fs = require("fs");
var host = "127.0.0.1";
var port = 5000;
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/dest"));

app.listen( port, host );
