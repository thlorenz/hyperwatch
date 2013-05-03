'use strict';
/*jshint browser: true */

// just requiring hyperwatch will initialize it and add a terminal to the browser window
require('hyperwatch')({ mini: { position: 'bottom right', size: '120x120', fontSize: 8 } });

var domready = require('domready');

domready(function () {

  var causeError =  document.getElementById('cause-error')
    , getUser    =  document.getElementById('get-user')
    , getUnknown =  document.getElementById('get-unknown')
    , results    =  document.getElementById('results');

  causeError.onclick = function () {
    var req = new XMLHttpRequest();
    req.open("GET", "/error");
    req.send();
  };

  getUser.onclick = function () {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        var user = JSON.parse(req.responseText);
        results.innerText += user.firstName + ' ' + user.lastName + '\n';
      }
    };
    req.open("GET", "/user");
    req.send();
  };

  getUnknown.onclick = function () {
    var req = new XMLHttpRequest();
    req.open("GET", "/unknown");
    req.send();
  };
});
