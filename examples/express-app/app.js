'use strict';

var express =  require('express')
  , app     =  express()
  , shoe    =  require('shoe')
  , log     =  require('npmlog')
  , path    =  require('path')
  , build   =  require('./build')
  ;

app
  .use(express.logger('dev'))
  .get('/', function (req, res) {
    res.sendfile('views/index.html');
  })
  .get('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    build().pipe(res);
  });

var sock = shoe(function (stream) {
  log.info('app', 'stream', stream);
  var iv = setInterval(function () {
        stream.write(Math.floor(Math.random() * 2));
    }, 250);

    stream.on('end', function () {
        clearInterval(iv);
    });

    stream.pipe(process.stdout, { end : false });
});

sock.install(app.listen(3000), '/watch');
log.info('app', 'listening on ', { host: 'localhost', port: 3000 });
