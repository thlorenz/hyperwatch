'use strict';

var style = require('get-style-property');

module.exports = function (mini) {
  return parseInt(style(mini, 'font-size'), 10);
};
