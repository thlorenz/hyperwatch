'use strict';
/*jshint browser: true */

var shoe = require('shoe')
  , es = require('event-stream');

// create this and inject into page
var result = document.getElementById('hyperwatch-output');

var stderr = shoe('/stderr');
var stdout = shoe('/stdout');
var stream = es.mapSync(function (msg) {
  result.appendChild(document.createTextNode(msg));
});
stderr.pipe(stream);
