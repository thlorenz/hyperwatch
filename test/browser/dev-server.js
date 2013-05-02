'use strict';

var http         =  require('http')
  , build        =  require('./build')
  , path         =  require('path')
  , tests;

var argv_ = process.argv.slice(2);
if (argv_.length) tests = argv_.map(path.resolve.bind(null, process.cwd()));

http.createServer(function (req, res) {
  return req.url === '/bundle.js' 
    ? serveBundle(req, res) 
    : req.url === '/' 
      ? serveIndex(req, res) 
      : console.error('cannot serve ', req.url);

}).listen(3000);
console.log('Listening: http://localhost:3000');

function serveBundle(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  build(tests).pipe(res);
}

function serveIndex(req, res) {
  res.setHeader('Content-Type', 'text/html');
  require('fs').createReadStream(path.join(__dirname, 'index.html')).pipe(res); 
}
