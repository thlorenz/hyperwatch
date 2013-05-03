'use strict';

function parseSize (s) {
  var sizes = s.split(/x/i);
  if (sizes.length !== 2) throw new Error('"' + s +'" is ot a valid size. Needs to be of the form WIDTHxHEIGHT');
  return { width: sizes[0].trim(), height: sizes[1].trim() };
}

function parsePosition (p) {
  var pos = p
    .trim()
    // normalize multiple spaces, so that "top    left" works too
    .replace(/ +/, ' ')
    // allow "top-left" as well
    .split(/[ \-]/);

  if (pos.length !== 2) throw new Error('"' + p +'" is ot a valid position. Needs to be of the form "bottom right", "top left", etc.');
  return { y: pos[0].trim(), x: pos[1].trim() };
}

module.exports = function (opts) {
  opts = opts || {};
  opts.mini = opts.mini || {};

  var miniSize =  parseSize(opts.mini.size || '200x200')
    , miniPos  =  parsePosition(opts.mini.position || 'bottom right')
    , fontSize =  opts.mini.fontSize || opts.mini['font-size'] || '6';

  return { 
    mini: { 
        size     :  miniSize
      , position :  miniPos
      , fontSize :  fontSize
    } 
  };
};
