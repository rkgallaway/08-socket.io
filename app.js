'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
console.log('hello');

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const loadFile = (file) => readFile(file); 

const saveFile = (file, buffer) => writeFile(file, buffer);

const convertBuffer = (buffer) => Buffer.from( buffer.toString().toUpperCase() );

const alterFile = (file) => 
  loadFile(file)
    .then (contents => convertBuffer(contents))
    .then (buffer => saveFile(file, buffer))
    .then  (() => socket.emit(`${file} saved`))
    .catch(error => socket.emit(error));

const alterFileOld = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { throw err; }
    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { throw err; }
      console.log(`${file} saved`);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
