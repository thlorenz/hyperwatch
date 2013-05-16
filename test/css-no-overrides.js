'use strict';
/*jshint asi: true browser: true */

var test     =  require('tape')
  , style    =  require('get-style-property')
  , fontsize =  require('./utils/fontsize')
  , hypernal =  require('..')

test('given no opts', function (t) {
  hypernal(null, function () {
    
    var mini = document.getElementsByClassName('hyperwatch-mini')[0]
      , full = document.getElementsByClassName('hyperwatch-full')[0];

    t.equal(style(mini, 'right'), '0px', 'mini is on the right')
    t.equal(style(mini, 'bottom'), '0px', 'mini is on the bottom')
    t.equal(style(mini, 'width'), '200px', 'mini has medium compact width')
    t.equal(style(mini, 'height'), '200px', 'mini has medium compact height')
    t.equal(fontsize(mini), 5, 'mini has small font')
    t.end()

  })
})
