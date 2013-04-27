'use strict';
/*jshint browser: true */

var shoe = require('shoe')
  , es = require('event-stream');

// create this and inject into page
var result = document.getElementById('hyperwatch-output');

var stream = shoe('/watch');
var s = es.mapSync(function (msg) {
  result.appendChild(document.createTextNode(msg));
  return String(Number(msg) ^ 1);
});
s.pipe(stream).pipe(s);
