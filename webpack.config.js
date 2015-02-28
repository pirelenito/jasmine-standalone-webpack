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
