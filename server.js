var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('server is running');
});

io.on('connection', function(client) {
  // Listen to message and broadcast it to all users
  client.on('message', function(msg) {
    io.emit('message', msg);
  });

  // user disconnect
  client.on('disconnect', function() {
    console.log('Disconnect');
  });
});

http.listen(process.env.PORT || 8000, function() {
  console.log('listening on port 8000');
});
