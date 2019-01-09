'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
console.log('hello');

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 *
 *
 * @param {*} file
 */
const loadFile = (file) => readFile(file); 

/**
 *
 *
 * @param {*} file
 * @param {*} buffer
 */
const saveFile = (file, buffer) => writeFile(file, buffer);

/**
 *
 *
 * @param {*} buffer
 */
const convertBuffer = (buffer) => Buffer.from( buffer.toString().toUpperCase() );

/**
 *
 *
 * @param {*} file
 */
const alterFile = (file) => 
  loadFile(file)
    .then (contents => convertBuffer(contents))
    .then (buffer => saveFile(file, buffer))
    .then  (() => socket.emit('save', `${file} saved`))
    .catch(error => socket.emit('error', error));

let file = process.argv.slice(2).shift();
alterFile(file);
