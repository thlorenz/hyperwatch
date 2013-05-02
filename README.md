# hyperwatch

Streams server side log messages to the browser and renders them inside your page.

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
  , function () { console.log('terminals have been initialized'); }
  });
```

### Server Side

Pass the server to hyperwatch. 

#### using express

Pass return value of `listen`:

```js
var express    =  require('express')
  , app        =  express()
  , hyperwatch =  require('hyperwatch');

hyperwatch(app.listen(3000));
```
*[full example](https://github.com/thlorenz/hyperwatch/tree/master/examples/express-app)*

#### using ecstatic

Pass http server:

```js
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(3000);

hyperwatch(server);
```

## Demo

    npm explore hyperwatch && npm run demo

Then open [localhost:3000](http://localhost:3000).

