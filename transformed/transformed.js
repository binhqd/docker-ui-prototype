(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (__dirname){

'use strict';

var fs = require('fs');

fs.readdirSync(__dirname + '/../ui').forEach(function (file) {
  if (!/\.js$/.test(file)) return;

  var filename = __dirname + '/../ui/' + file;
  var contents = fs.readFileSync(filename, 'utf8');
  var prepend = ["var jQuery = require('jquery');"];

  // parse dependencies in comments
  var deps = contents.match(/\s*\/* Depends:\s*\n(?:[\s\*]*(jquery\.ui\..+\.js)\s*\n)+/);
  if (deps) {
    deps[0].split('\n').slice(1, -1).forEach(function (dep) {
      dep = dep.replace(/[\s\*]/g, '').replace(/^jquery[.-]ui\.(.+)\.js/, '$1');
      prepend.push("require('./" + dep + "');");
    });
  }

  // prepend jQuery require and all dependencies for the module
  contents = prepend.join('\n') + '\n\n' + contents;
  fs.writeFileSync(__dirname + '/../' + file.replace(/^jquery[.-]ui\.(.+)\.js/, '$1.js'), contents, 'utf8');
});

}).call(this,"/app/node_modules/jquery-ui/scripts")
},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1]);
