'use strict';
/*jshint browser: true */

var causeError = document.getElementById('cause-error');

causeError.onclick = function () {
  var req = new XMLHttpRequest();
  req.open("GET", "/error");
  req.send();
};
