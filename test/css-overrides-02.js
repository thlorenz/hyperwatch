'use strict';
/*jshint asi: true browser: true */

var test     =  require('tape')
  , style    =  require('get-style-property')
  , fontsize =  require('./utils/fontsize')
  , hypernal =  require('..')

var opts = {
  mini: {
      position    :  'bottom left'
    , size        :  '600x500'
    , 'font-size' :  '12'
  }
}

test('given opts: ' + JSON.stringify(opts), function (t) {

  hypernal(opts, function () {
    
    var mini = document.getElementsByClassName('hyperwatch-mini')[0]
      , full = document.getElementsByClassName('hyperwatch-full')[0];

    t.equal(style(mini, 'left'), '0px', 'mini is on the left')
    t.equal(style(mini, 'bottom'), '0px', 'mini is on the bottom')
    t.equal(style(mini, 'width'), '600px', 'mini has width 600px')
    t.equal(style(mini, 'height'), '500px', 'mini has height 500px')
    t.equal(fontsize(mini), 12, 'mini has font size 12px')
    t.end()

  })
})
