npm-laplace [![Build Status](https://travis-ci.org/kjirou/npm-laplace.png)](https://travis-ci.org/kjirou/npm-laplace)
===========

A mock generator to replace Math.random() for testing


## Download

- [Stable production version](https://raw.github.com/kjirou/npm-laplace/master/laplace.min.js)
- [Stable development version](https://raw.github.com/kjirou/npm-laplace/master/laplace.js)
- [Old releases](https://github.com/kjirou/npm-laplace/releases)

Or, if you can use `npm`:
```
$ npm install laplace
```


## Supported browsers/Node.js

- `IE10`, `IE9`, `IE8`, `IE7`
- `Chrome`
- `Firefox`
- `Safari`
- `Mobile Safari`
- `PhantomJS`
- `Node.js` >= `0.11`


## License

[MIT License](http://opensource.org/licenses/mit-license.php)


## Usage

```
// If you want to use by node.js
//var laplace = require("laplace");

var mock = laplace.createMock(100);

for (var i = 0; i < 100; i += 1) {
  console.log(mock());  // 0, 0.1, 0.2, .. , 0.99
}

mock();  // Throw a error, because execution count is overflow
```


## Use with Sinon.js

```
var mock = laplace.createMock(100);
var stub = sinon.stub(Math, "random", mock);

for (var i = 0; i < 100; i += 1) {
  console.log(Math.random());  // 0, 0.1, 0.2, .. , 0.99
}

stub.restore();
```

And, with `_.random` of Underscore.js
```
var mock = laplace.createMock(5);
var stub = sinon.stub(Math, "random", mock);

for (var i = 0; i < 100; i += 1) {
  console.log(_.random());  // 0, 1, 2, 3, 4
}

stub.restore();
```


## Development

### Dependencies

- `node.js` >= `0.11.0`, e.g. `brew install node`
- `PhantomJS`, e.g. `brew install phantomjs`

```
$ npm install -g grunt-cli testem
```

### Deploy

```
$ git clone git@github.com:kjirou/npm-laplace.git
$ cd npm-laplace
$ npm install
```

### Util commands

- `grunt jshint` validates codes by JSHint.
- `grunt release` generates JavaScript files for release.

### Testing

- Open [test/index.html](test/index.html)
- Or, execute `testem` or `testem server`, after that, open [http://localhost:7357/](http://localhost:7357/)
- `grunt test` tests by node.js.
- `grunt testem:web` is CI test by PhantomJS only.
- `grunt testem:xb` is CI test by PhantomJS, Chrome, Firefox and Safari.


## Related Links

- [npm - laplace](https://npmjs.org/package/laplace)
