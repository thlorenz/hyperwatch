'use strict';

var express =  require('express')
  , app     =  express()
  , shoe    =  require('shoe')
  , path    =  require('path')
  , build   =  require('./build')
  ;

  var log = require('npmlog');
app
  .use(express.logger('dev'))
  .get('/', function (req, res) {
    res.sendfile('views/index.html');
  })
  .get('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    build().pipe(res);
  });

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

var listen = app.listen(3000);

stderr.install(listen, '/stderr');
stdout.install(listen, '/stdout');

log.info('app', 'listening on ', { host: 'localhost', port: 3000 });


var iv = setInterval(function () {
  log.info('app', 'hi');
}, 250);

stderr.on('end', function () {
  clearInterval(iv);
});
