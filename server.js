'use strict';

const io = require('socket.io')(3000);
console.log('hello');


io.on('connection', (socket) => {

  console.log('New Connection', socket.id);
  socket.on('error', (payload) => {
    socket.broadcast.emit('error', payload);  // or broadcast.emit doesn't matter
  });

  socket.on('save', (payload) => {  
    socket.broadcast.emit('saved', payload);  // or broadcast.emit doesn't matter
  });
});