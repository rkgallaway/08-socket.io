'use strict';

const io = require('socket.io')(3000);
console.log('hello');


io.on('connection', (socket) => {

  console.log('New Connection', socket.id);
  socket.on('file-error', (payload) => {
    socket.emit('error', payload());  // or broadcast.emit doesn't matter
  });

  socket.on('file-save', (payload) => {
    socket.emit('save', payload());  // or broadcast.emit doesn't matter
  });
});