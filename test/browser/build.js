#! /usr/bin/node

'use strict';
/*jshint asi: true */

var browserify =  require('browserify')
  , path       =  require('path')
  , fs         =  require('fs')
  , mold       =  require('mold-source-map')
  , jsroot     =  path.resolve(__dirname, '../..');

var bundle = module.exports = function (tests) {
  tests = tests  || allTests();
  return browserify(tests)
    .bundle({ debug: true })
    .pipe(mold.transformSourcesRelativeTo(jsroot))
};


function allTests() {
  var testdir = path.resolve(__dirname, '..')
    , jsfiles = fs.readdirSync(testdir)
      .filter(function (file) { 
        return path.extname(file) === '.js' 
      });
  return jsfiles.map(function (x) { return path.resolve( __dirname, '..', x) })
}

if (!module.parent) {
  var tests;
  var argv_ = process.argv.slice(2) 
  if (argv_.length) tests = argv_.map(path.resolve.bind(null, process.cwd()));
    bundle(tests).pipe(fs.createWriteStream(__dirname + '/bundle.js'));
}
