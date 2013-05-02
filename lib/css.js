'use strict';

module.exports = function (opts) {
  opts = opts || {};
  opts.mini = opts.mini || {};

  opts.mini.position =  opts.mini.position || 'bottom right';
  opts.mini.size     =  opts.mini.size     || '200x200';
  opts.mini.fontSize =  opts.mini.fontSize || opts.mini['font-size'] || '6';
  
  var miniSize = convertSize(opts.mini.size)
    , miniPos  = convertPosition(opts.mini.position);

  return [
      '.hyperwatch-mini,'
    , '.hyperwatch-full {'
    , '  background       :  black;'
    , '  position         :  absolute;'
    , '  border           :  solid 2px #808080;'
    , '  font-family      :  Terminus,Consolas,Profont,Monaco,Inconsolata,Inconsolata-g,'
    , '    Unifont,Lime,"ClearlyU PUA",Clean,"DejaVu Sans Mono","Lucida Console",'
    , '    "Bitstream Vera Sans Mono",Freemono,"Liberation Mono",Dina,Anka,Droid Sans Mono,'
    , '    Anonymous Pro,Proggy fonts,Envy Code R,Gamow,Courier,"Courier New",Terminal,monospace;'
    , '}'
    , ''
    , '.hyperwatch-mini {'
    , '  ' + miniPos.y + '            :  0;'
    , '  ' + miniPos.x + '            :  0;'
    , '  font-size        :  ' + opts.mini.fontSize + 'px;'
    , '  width            :  ' + miniSize.width + 'px;'
    , '  height           :  ' + miniSize.height + 'px;'
    , '  border-radius    :  3px;'
    , '  margin           :  5px;'
    , '  cursor           :  pointer;'
    , '}'
    , ''
    , '.hyperwatch-full {'
    , '  top              :  100px;'
    , '  right            :  100px;'
    , '  font-size        :  16px;'
    , '  height           :  80%;'
    , '  width            :  80%;'
    , '  border-radius    :  5px;'
    , '  display          :  none;'
    , '  z-index          :  99999999;'
    , '  margin           :  10px;'
    , '  cursor           :  text;'
    , '}'
    , '.hyperwatch-full > .terminal > div {'
    , '  margin: 5px 5px 0 5px;'
    , '}'
    ].join('\n');
};

function convertSize (s) {
  var sizes = s.split(/x/i);
  if (sizes.length !== 2) throw new Error('"' + s +'" is ot a valid size. Needs to be of the form WIDTHxHEIGHT');
  return { width: sizes[0].trim(), height: sizes[1].trim() };
}

function convertPosition (p) {
  var pos = p
    .trim()
    // normalize multiple spaces, so that "top    left" works too
    .replace(/ +/, ' ')
    // allow "top-left" as well
    .split(/[ \-]/);

  if (pos.length !== 2) throw new Error('"' + p +'" is ot a valid position. Needs to be of the form "bottom right", "top left", etc.');
  return { y: pos[0].trim(), x: pos[1].trim() };
}
