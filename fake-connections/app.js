var connections = process.argv[2];
// var port = process.argv[3];
// var connections = process.argv[4];

function createConnection() {
  var socket = require('socket.io-client');
  io = socket.connect('http://localhost:8080', { 'force new connection': true });
  io.on('connect', function(){
    console.log('connected');

    var startx = Math.floor(Math.random() * 800) + 100;
    var starty = Math.floor(Math.random() * 600) + 100;
    var range = 300;

    data = {
      x: startx,
      y: starty,
      type: "dragstart"
    };

    io.emit('drawClick', data);

    for (var i = 0; i < range; i++){
      data = {
        x: startx + i,
        y: starty + i,
        type: "drag"
      };

      io.emit('drawClick', data);
    }

    data = {
      x: range + startx,
      y: range + starty,
      type: "dragend"
    };

    io.emit('drawClick', data);

  });
}

for (var i = 0; i < connections; i++) {
  createConnection();
}
