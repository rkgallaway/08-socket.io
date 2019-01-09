'use strict';

const io = require('socket.io')(3000);
console.log('hello');


io.on('connection', (socket) => {
  //control alt DD not working on this page
  console.log('New Connection', socket.id);
  socket.on('error', (payload) => {
    socket.broadcast.emit('error', payload);  
  });

  socket.on('save', (payload) => {  
    socket.broadcast.emit('saved', payload);  
  });
});