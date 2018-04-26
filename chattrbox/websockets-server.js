var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
var topics = [];
var tpccmd = '/topic';

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');

  topics.forEach(function(tpc) {
    var temp = '*** Topic is ' + tpc;
    socket.send(temp);
  });

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)

      topicChanged = data.indexOf(tpccmd);
      if (topicChanged != -1) {
        var newtopic = data.substring(7);
        console.log('*** Topic has changed to ' + newtopic)
        topics[0] = newtopic;
      };
    });
  });
});
