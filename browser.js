'use strict';
/*jshint browser: true */

var shoe = require('shoe')
  , hypernal = require('hypernal')
  , getStyleProperty = require('get-style-property')
  ;

function addWatch(classname) {
  var term = hypernal();
  term.tail = true;

  var container = document.createElement('div');
  container.setAttribute('class', classname);
  document.body.appendChild(container);
  term.appendTo(container);

  return { container: container, term: term };
}

var mini = addWatch('hyperwatch-mini')
  , full = addWatch('hyperwatch-full');

mini.container.onclick = function () { 
  var current = getStyleProperty(full.container, 'display');

  var next = current === 'none' ? 'block' : 'none';
  full.container.style.setProperty('display', next);
};

full.container.onclick = function () { 
  full.term.tail = !full.term.tail;
};

window.mini = mini;
window.full = full;

var stderr = shoe('/stderr');
var stdout = shoe('/stdout');

stderr.pipe(mini.term);
stderr.pipe(full.term);

stdout.pipe(mini.term);
stdout.pipe(full.term);
