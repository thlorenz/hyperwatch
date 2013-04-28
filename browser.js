'use strict';
/*jshint browser: true */

var shoe = require('shoe')
  , hypernal = require('hypernal');

function addWatch(cols, rows, classname) {
  var term = hypernal(cols, rows);
  var container = document.createElement('div');
  container.setAttribute('class', classname);
  document.body.appendChild(container);
  term.appendTo(container);

  return { container: container, term: term };
}

var mini = addWatch(60, 40, 'hyperwatch-mini')
  , full = addWatch(100, 100, 'hyperwatch-full');

mini.container.onclick = function () { 
  var current = full.container.style.getProperty('display');
  var next = current === 'none' ? 'block' : 'none';
  full.container.style.setProperty('display', next);
};

full.container.onclick = function () { 
  full.container.style.setProperty('display', 'none');
};

window.mini = mini;
window.full = full;

var stderr = shoe('/stderr');
var stdout = shoe('/stdout');

stderr.pipe(mini.term).pipe(full.term);
stdout.pipe(mini.term).pipe(full.term);
