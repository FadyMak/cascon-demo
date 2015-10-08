var express = require('express.io');
var app = express().http().io();
var appmetrics = require('appmetrics-dash').start();

var userList = {"lobby":[], "room1":[], "room2":[], "room3":[], "room4":[], "room5":[], "room6":[]}
var curUser = {"lobby": "", "room1": "", "room2": "", "room3": "", "room4": "", "room5": "", "room6": ""}

// Broadcast all draw clicks.
app.io.route('drawClick', function(req) {
  	req.data.cid = req.io.socket.id;
    var room = req.data.room;
    console.log(room);
    // req.io.broadcast.to(room).('draw', req.data);
    req.io.room(room).broadcast('draw', req.data);
});

/*
app.io.route('getPlayers', function(req) {
    var room = req.data.room;
    console.log(room);
    // req.io.broadcast.to(room).('draw', req.data);
    req.io.room(room).broadcast('playerList', userList[room]);
});
*/

app.io.route('getCurrentUser', function(req) {
    var room = req.data.room;
    req.data.curUser = curUser[room]
    console.log(req.data)
    req.io.room(room).broadcast('currentUser', req.data);
});



app.io.on('connection', function(socket){
  console.log('connection recieved');
});

app.io.route('joinRoom', function(socket) {
    socket.io.join(socket.data)
    userList[socket.data].push(socket.io.socket.id)
    socket.io.socket.emit("clientID", socket.io.socket.id)
});

// Send client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html');
});


app.use('/jscolor', express.static(__dirname + '/jscolor'));
app.use('/icons', express.static(__dirname + '/icons'));
app.use('/lib', express.static(__dirname + '/lib'));

app.listen(8080);

for(var room in userList){
    if(room == "lobby")
    {
        
    }
    else
    {
        console.log(room);
        (function theLoop(i, r) {
            setTimeout(function () {
                curUser[r] = userList[r][i - 1];
                console.log(curUser[r]);
                //alert(curUser);
                if (--i > 0) {          // If i > 0, keep going
                    theLoop(i, r);       // Call the loop again, and pass it the current value of i
                } else {
                    i = userList[r].length;
                    theLoop(i, r);
                }
            }, 10000);
        })(userList[room].length, room); 
    }
};
