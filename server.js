var express = require('express.io');
var app = express().http().io();
var appmetrics = require('appmetrics-dash').start();

// Broadcast all draw clicks.
app.io.route('drawClick', function(req) {
  	req.data.cid = req.io.socket.id;
    var room = req.data.room;
    // console.log(room);
    req.io.room(room).broadcast('draw', req.data);
});

app.io.on('connection', function(socket){
  console.log('connection recieved');
});

app.io.route('joinRoom', function(socket) {
    socket.io.join(socket.data)
});

// Send client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html');
});


app.use('/jscolor', express.static(__dirname + '/jscolor'));
app.use('/icons', express.static(__dirname + '/icons'));
app.use('/lib', express.static(__dirname + '/lib'));

app.listen(8080);
