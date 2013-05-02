'use strict';
/*jshint browser:true */
var css = require('./css')
  , loadCss = require('./load-css');

// TODO: separate npm module
module.exports = function loadStyles(opts) {
  loadCss(css(opts));  
};
