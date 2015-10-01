function createConnection() {
  var socket = require('socket.io-client');
  io = socket.connect('http://127.0.0.1:8080', { 'force new connection': true });
  io.on('connect', function(){
    console.log('connected');
  });
}

for (var i = 0; i < 5; i++) {
  createConnection();
}
