'use strict';
/*jshint browser:true */

// TODO: separate npm module
module.exports = function load(css) {
  var head   =  document.getElementsByTagName('head')[0];
  var style =  document.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};
