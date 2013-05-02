'use strict';
/*jshint asi: true browser: true */

var test     =  require('tape')
  , style    =  require('get-style-property')
  , hypernal =  require('..')

var opts = {
  mini: {
      position :  'top left'
    , size     :  '120x300'
    , fontSize :  '4'
  }
}

test('given opts: ' + JSON.stringify(opts), function (t) {

  hypernal(opts, function () {
    
    var mini = document.getElementsByClassName('hyperwatch-mini')[0]
      , full = document.getElementsByClassName('hyperwatch-full')[0];

    t.equal(style(mini, 'left'), '0px', 'mini is on the left')
    t.equal(style(mini, 'top'), '0px', 'mini is on the top')
    t.equal(style(mini, 'width'), '120px', 'mini has width 120px')
    t.equal(style(mini, 'height'), '300px', 'mini has height 300px')
    t.equal(style(mini, 'font-size'), '4px', 'mini has font size 4px')
    t.end()

  })
})
