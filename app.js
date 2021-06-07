const express = require('express');
const { readFileSync } = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { });


io.on('connection', (socket) => {
  socket.on('user', (user) => {
    console.log(user);
    console.log('A user connected');
    socket.broadcast.emit('chat message', `<i>${user.nickname} joined.</i>`);

    socket.on('disconnect', () => {
      console.log('user disconnected');
      socket.broadcast.emit('chat message', `<i>${user.nickname} left.</i>`);
    });

    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`);
      socket.broadcast.emit('chat message', `<b>${user.nickname}:</b> ${msg}`);
    });
  });
});

server.listen(3000, () => {
  console.log('Listening on PORT 3000...');
});

