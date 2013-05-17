# hyperwatch

Streams server side log messages to the browser and renders them inside your page.

[![screenshot](https://raw.github.com/thlorenz/hyperwatch/master/assets/screenshot.png)](http://thlorenz.github.io/hyperwatch/)

## Installation

    npm install hyperwatch

## Setup

### Client Side

#### using default options

```js
// just require hyperwatch in order to add a terminal to the browser window
require('hyperwatch')();
```

#### using custom options

#### make mini terminal appear merely a thumbnail

```js
require('hyperwatch')({
  mini: {
      position: 'top right'
    , width: 100
    , height: 100
    , fontSize: 3
  }
});
```

#### make mini terminal appear rather large and get called back when terminals have been initialized

```js
require('hyperwatch')({
    mini: {
          position: 'bottom left'
        , width: 600
        , height: 300
        , fontSize: 12 
      }
    }
  , function () { console.log('terminals have been initialized'); }
);
```

### Server Side

Pass the server to hyperwatch. 

#### using express

Pass return value of `listen`:

```js
var express    =  require('express')
  , app        =  express()
  , hyperwatch =  require('hyperwatch');

var config = hyperwatch(app.listen(3000));
```
*[full example](https://github.com/thlorenz/hyperwatch/tree/master/examples/express-app)*

#### using ecstatic

Pass http server:

```js
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(3000);

var config = hyperwatch(server);
```

## Configuration

Calling `hyperwatch(server)` initializes and enables hyperwatch and returns a `config` object with the following functions:

***config.disable***

Invoking `config.disable()` will stop data to be streamed to the client and hide the mini terminal when the browser
is refreshed.

***config.enable***

Invoking `config.enable()` will resume data to be streamed to the client and show the mini terminal when the browser
is refreshed.

***config.scrollback***

Specifies the number of log messages that will be preserved between browser refreshes. The default is `10,000`. Keep in
mind that this data is kept in memory when setting this to very high values.

## Interactions

### Click Mini Terminal

Toggles full size Terminal

### Alt/Option-Click Mini Terminal

Make it jump from left to right and vice versa in case it gets in your way

## Demo

    npm explore hyperwatch && npm run demo

Then open [localhost:3000](http://localhost:3000).

