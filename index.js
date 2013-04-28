'use strict';

var shoe = require('shoe');

var stderr = shoe(function (stream) {
  var stderr = process.stderr;
  var stderr_write = stderr.write;

  stderr.write = function () {
    stderr_write.apply(stderr, arguments);
    stream.write.apply(stream, arguments);
  };
});

var stdout = shoe(function (stream) {
  var stdout = process.stdout;
  var stdout_write = stdout.write;

  stdout.write = function () {
    stdout_write.apply(stdout, arguments);
    stream.write.apply(stream, arguments);
  };
});

module.exports = function (installee) {
  stderr.install(installee, '/stderr');
  stdout.install(installee, '/stdout');
};
