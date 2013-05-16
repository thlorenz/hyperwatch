'use strict';

var express    =  require('express')
  , app        =  express()
  , log        =  require('npmlog')
  , path       =  require('path')
  , build      =  require('./build')
  , hyperwatch =  require('../..')
  ;

log.level = 'verbose';

app
  .use(express.logger('dev'))
  .get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
  })
  .get('/index.css', function (req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendfile(__dirname + '/index.css');
  })
  .get('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    build().pipe(res);
  })
  .get('/user', function (req, res) {
    var user = { firstName: 'Bob', lastName: 'Marley', likes: 'Reggae', plays: 'guitar', rastafari: true };
    log.verbose('app', 'sending user', user);
    res.json(user);
  })
  .get('/error', function (req, res) {
    log.error('app', new Error('Some very aweful error occured in your app'));
    res.send(505);
  });

hyperwatch(app.listen(3000));

log.info('app', 'listening on http://%s:%s', 'localhost', 3000);

setInterval(
    log.info.bind(log, 'app', 'server hearbeat ***--- still alive ---***')
  , 10000
); 
