'use strict';
/*jshint browser: true */

require('./lib/shim-trim');

var shoe               =  require('shoe')
  , hypernal           =  require('hypernal')
  , getStyleProperty   =  require('get-style-property')
  , loadTerminalStyles =  require('./lib/load-terminal-styles')
  , parseOpts          =  require('./lib/parse-opts')
  , domready           =  require('domready')
  , through            =  require('through')
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

  function toggleFull() {
    var current = getStyleProperty(full.container, 'display');

    var next = current === 'none' ? 'block' : 'none';
    full.container.style.setProperty('display', next);

    // Makes sense to start tailing every time we open full terminal and immediately scroll to bottom via empty write
    if (next === 'block') { 
      full.term.tail = true;
      full.term.write('');
    }
  }

  function jumpMini() {
    var  current = getStyleProperty(this, 'left');
    if (current === '0px') {
      // jump right
      var left = document.body.clientWidth - opts.mini.size.width;
      this.style.left = left + 'px';
    } else {
      // jump left
      this.style.left = '0px';
    }
  }

  mini.container.onclick = function (event) { 
    if(event.altKey) jumpMini.bind(this)(); else toggleFull.bind(this)();
  };

  full.container.onscroll = function () {
    var containerBottom = full.container.getBoundingClientRect().bottom
      , childBottom = full.child.getBoundingClientRect().bottom;

    full.term.tail = childBottom - containerBottom < 10;
  };

  connectStreams(mini, full);
}


function connectStreams (mini, full) {
  var stderr = shoe('/stderr');
  var stdout = shoe('/stdout');
  var showingMini;

  // show mini only once we get data from the server since that means hyperwatch was enabled there
  mini.container.style.display = 'none';
  showingMini = false;

  function showMini (data) {
    if (!showingMini) {
      mini.container.style.display = 'block';
      showingMini = true;
    }
    this.queue(data);
  }

  stderr.pipe(through(showMini)).pipe(mini.term);
  stderr.pipe(full.term);

  stdout.pipe(through(showMini)).pipe(mini.term);
  stdout.pipe(full.term);
}

module.exports = function (opts, cb) {
  var parsedOpts = parseOpts(opts);
  domready(function () { 
    init(parsedOpts); 
    cb && cb(); 
  });
};
