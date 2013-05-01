# hyperwatch

Streams server side log messages to the browser and renders them inside your page.

## Installation

    npm install hyperwatch

## Setup

### Client Side

```js
// just require hyperwatch in order to add a terminal to the browser window
require('hyperwatch');
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

## Demo

    npm explore hyperwatch && npm run demo

Then open [localhost:3000](http://localhost:3000).
