# Jasmine Standalone Webpack

This is basically the [Jasmine Standalone Release](https://github.com/jasmine/jasmine/tree/master/dist) ported to use [webpack](http://webpack.github.io/).

It shows that it is possible to use custom loaders like [babel](http://babeljs.io/) to get [ES6](http://babeljs.io/docs/learn-es6/) support with [very little effort](https://github.com/pirelenito/jasmine-standalone-webpack/commit/13d059525aa1c1dc4086864cc80ac42ed27880d4).

It includes:

* [Jasmine 2.2](http://jasmine.github.io/2.2/introduction.html);
* [Webpack 1.6](http://webpack.github.io/);
* [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html);
* [Babel 4.6](http://babeljs.io/).

This is a follow-up to the previous [jasmine-standalone-requirejs](https://github.com/pirelenito/jasmine-standalone-requirejs)

## Running

[Download](https://github.com/pirelenito/jasmine-standalone-webpack/releases) the release, install the dependencies and start the development server:

```bash
npm install
npm start
```

Then open your browser at [http://localhost:8080/SpecRunner.html](http://localhost:8080/SpecRunner.html) and see the tests running.

## How it was done

You can check all the changes through [this single commit](https://github.com/pirelenito/jasmine-standalone-webpack/commit/13d059525aa1c1dc4086864cc80ac42ed27880d4).

First we had to turn the source files into ES6 modules by simply exporting their default values. Take the `Song` module for example:

```js
function Song() {
}

Song.prototype.persistFavoriteStatus = function(value) {
  // something complicated
  throw new Error("not yet implemented");
};

export default Song;
```

At the specs we had to add as dependencies the sources and `SpecHelper` modules:

```js
import './SpecHelper';
import Player from '../src/Player';
import Song from '../src/Song';

describe("Player", function() {
  // spec code ...
});
```

And finally, at the `SpecRunner.html`, we had to replace all references to source and spec files by a single entry, the `spec.js` file:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Jasmine Spec Runner v2.2.0</title>

  <link rel="shortcut icon" type="image/png" href="lib/jasmine-2.2.0/jasmine_favicon.png">
  <link rel="stylesheet" href="lib/jasmine-2.2.0/jasmine.css">

  <script src="lib/jasmine-2.2.0/jasmine.js"></script>
  <script src="lib/jasmine-2.2.0/jasmine-html.js"></script>
  <script src="lib/jasmine-2.2.0/boot.js"></script>

  <script src="spec.js"></script>
</head>
<body>
</body>
</html>
```

This `spec.js` entry point is then configured in the `webpack.config.js` file (plus the [babel loader](https://github.com/babel/babel-loader)):

```js
module.exports = {
  context: __dirname,
  entry: {
    spec: [
      './spec/PlayerSpec.js'
    ]
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

And we can finally use the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) to serve the `SpecRunner.html` and see the tests running.

```bash
./node_modules/.bin/webpack-dev-server
```

## Final thoughts

For a more feature-complete solution, take a look at [Karma](http://karma-runner.github.io/).

## Authors

* [Paulo Ragonha](https://github.com/pirelenito)
