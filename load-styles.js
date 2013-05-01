'use strict';
/*jshint browser:true */

// TODO: separate npm module
module.exports = function loadStyles() {
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

var css = [
   '.hyperwatch-mini,'
 , '.hyperwatch-full {'
 , '  background       :  black;'
 , '  position         :  absolute;'
 , '  top              :  0;'
 , '  border           :  solid 2px #808080;'
 , '  cursor           :  pointer;'
 , '}'
 , ''
 , '.hyperwatch-mini {'
 , '  right            :  0;'
 , '  font-size        :  4px;'
 , '  height           :  80px;'
 , '  width            :  80px;'
 , '  border-radius    :  3px;'
 , '  margin           :  5px;'
 , '}'
 , ''
 , '.hyperwatch-full {'
 , '  top              :  100px;'
 , '  right            :  100px;'
 , '  font-size        :  18px;'
 , '  height           :  80%;'
 , '  width            :  80%;'
 , '  border-radius    :  5px;'
 , '  display          :  none;'
 , '  z-index          :  99999999;'
 , '  margin           :  10px;'
 , '}'
].join('\n');
