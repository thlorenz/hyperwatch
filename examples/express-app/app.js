'use strict';

var express    =  require('express')
  , app        =  express()
  , log        =  require('npmlog')
  , path       =  require('path')
  , build      =  require('./build')
  , hyperwatch =  require('../../')
  ;

app
  .use(express.logger('dev'))
  .get('/', function (req, res) {
    res.sendfile('views/index.html');
  })
  .get('/index.css', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendfile(__dirname + '/index.css');
  })
  .get('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    build().pipe(res);
  });

hyperwatch(app.listen(3000));

log.info('app', 'listening on ', { host: 'localhost', port: 3000 });


var count = 0;
var iv = setInterval(function () {
  log.info('app', 'hi for the %s time', count++);
}, 10000);
