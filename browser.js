'use strict';
/*jshint browser: true */

var shoe               =  require('shoe')
  , hypernal           =  require('hypernal')
  , getStyleProperty   =  require('get-style-property')
  , loadTerminalStyles =  require('./lib/load-terminal-styles')
  , domready           =  require('domready')
  ;

function addWatch(classname) {
  var term = hypernal();
  term.tail = true;

  var container = document.createElement('div');
  container.setAttribute('class', classname);
  document.body.appendChild(container);
  term.appendTo(container);

  return { container: container, term: term, child: container.children[0] };
}

function init (opts) {
  loadTerminalStyles(opts);

  var mini = addWatch('hyperwatch-mini')
    , full = addWatch('hyperwatch-full');

  mini.container.onclick = function () { 
    var current = getStyleProperty(full.container, 'display');

    var next = current === 'none' ? 'block' : 'none';
    full.container.style.setProperty('display', next);

    // Makes sense to start tailing every time we open full terminal and immediately scroll to bottom via empty write
    if (next === 'block') { 
      full.term.tail = true;
      full.term.write('');
    }
  };

  full.container.onscroll = function () {
    var containerBottom = full.container.getBoundingClientRect().bottom
      , childBottom = full.child.getBoundingClientRect().bottom;

    full.term.tail = childBottom - containerBottom < 10;
  };

  window.mini = mini;
  window.full = full;

  var stderr = shoe('/stderr');
  var stdout = shoe('/stdout');

  stderr.pipe(mini.term);
  stderr.pipe(full.term);

  stdout.pipe(mini.term);
  stdout.pipe(full.term);
}

module.exports = function (opts, cb) {
  domready(function (){ init(opts); cb(); });
};
