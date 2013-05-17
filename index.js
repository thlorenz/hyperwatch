'use strict';

var maxbuflen = 500;
var shoe = require('shoe')
  , enabled = true
  , errStream
  , outStream
  , buf = [];

function buffer(args) {
  buf.push(args);
  if (buf.length > maxbuflen) buf.shift();
}

+function redirectStderr () {
  var stderr = process.stderr;
  var stderr_write = stderr.write;

  stderr.write = function () {
    stderr_write.apply(stderr, arguments);
    if (enabled && errStream) errStream.write.apply(errStream, arguments);
    buffer(arguments);
  };
}();

+function redirectStdout () {
  var stdout = process.stdout;
  var stdout_write = stdout.write;
  stdout.write = function () {
    stdout_write.apply(stdout, arguments);
    if (enabled && outStream) outStream.write.apply(outStream, arguments);
    buffer(arguments);
  };
}();

var stderrSock = shoe(function (stream) {

  if (errStream) errStream.destroy();
  errStream = stream;

  if (!enabled) return;
  buf.forEach(function (args) { 
    errStream.write.apply(errStream, args); 
  });
});

var stdoutSock = shoe(function (stream) {
  if (outStream) outStream.destroy();
  outStream = stream;
});

module.exports = function (installee) {
  stderrSock.install(installee, '/stderr');
  stdoutSock.install(installee, '/stdout');
  return { 
      disable    :  function () { enabled = false; }
    , enable     :  function () { enabled = true; }
    , scrollback :  function (n) { maxbuflen = n;  }
  };
};
