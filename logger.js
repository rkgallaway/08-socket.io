'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
console.log('hello');


/**
 *
 *
 * @param {*} payload
 */
const logError = (payload) => {
  if(payload) {
    console.error('ERROR!', payload);
  }
};

/**
 *
 *
 * @param {*} payload
 */
const logSuccess = (payload) => {
  console.log('seen'); // not logging 
  if(payload) {
    console.log('Something was saved', payload);
  }
};

socket.on('error', logError);
socket.on('saved', logSuccess);