'use strict';

module.exports = function (opts) {
  return [
      '.hyperwatch-mini,'
    , '.hyperwatch-full {'
    , '  background       :  black;'
    , '  position         :  absolute;'
    , '  top              :  0;'
    , '  border           :  solid 2px #808080;'
    , '  font-family      :  Terminus,Consolas,Profont,Monaco,Inconsolata,Inconsolata-g,'
    , '    Unifont,Lime,"ClearlyU PUA",Clean,"DejaVu Sans Mono","Lucida Console",'
    , '    "Bitstream Vera Sans Mono",Freemono,"Liberation Mono",Dina,Anka,Droid Sans Mono,'
    , '    Anonymous Pro,Proggy fonts,Envy Code R,Gamow,Courier,"Courier New",Terminal,monospace;'
    , '}'
    , ''
    , '.hyperwatch-mini {'
    , '  right            :  0;'
    , '  font-size        :  2px;'
    , '  height           :  80px;'
    , '  width            :  80px;'
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