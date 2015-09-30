var express = require('express.io');
var app = express().http().io();

// Broadcast all draw clicks.
app.io.route('drawClick', function(req) {
    req.io.broadcast('draw', req.data);
})

// Send client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html');
})

app.use('/jscolor', express.static(__dirname + '/jscolor'));
app.use('/icons', express.static(__dirname + '/icons'));

app.listen(8080);