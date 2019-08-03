var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.get('/', function(req, res) {
  res.send('server is running');
});

io.on('connection', function(client) {
  client.on('join', function(name) {
    console.log('Joined: ' + name);
    clients[client.id] = name;

    // client.emit means send message to only the socket that starts it
    // client.emit('update', 'You have connected to the server.');

    // Broadcasting means sending a message to everyone else except for the socket that starts it.
    // client.broadcast.emit('update', name + ' has joined the server.');
  });

  // Listen to message and broadcast it to all users
  client.on('message', function(msg) {
    console.log('Message: ' + msg);

    // Broadcasting means sending a message to everyone else except for the socket that starts it.
    // client.broadcast.emit('message', clients[client.id], msg);
    io.emit('message', msg);
  });

  client.on('disconnect', function() {
    console.log('Disconnect');
    io.emit('update', clients[client.id] + ' has left the server.');
    delete clients[client.id];
  });
});

http.listen(80, function() {
  console.log('listening on port 80');
});
