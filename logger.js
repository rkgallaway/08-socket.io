'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
console.log('hello');


const logError = (payload) => {
  if(payload) {
    console.error('ERROR!', payload);
  }
};

const logSuccess = (payload) => {
  if(payload) {
    console.log('Something was saved', payload);
  }
};

socket.on('error', logError);
socket.on('saved', logSuccess);