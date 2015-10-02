var express = require('express.io');
var app = express().http().io();
var appmetrics = require('appmetrics-dash').start(); 

// Broadcast all draw clicks.
app.io.route('drawClick', function(req) {
    req.io.broadcast('draw', req.data);
})

app.io.on('connection', function(){
  console.log('connection recieved');
});

// Send client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html');
});

app.use('/jscolor', express.static(__dirname + '/jscolor'));
app.use('/icons', express.static(__dirname + '/icons'));
app.use('/lib', express.static(__dirname + '/lib'));

app.listen(8080);
