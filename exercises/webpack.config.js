//npm install --save-dev escope@3.3.0

const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel?optional[]=runtime&optional[]=es7.comprehensions&stage=0',
          'eslint?failOnWarning=false&failOnError=false']
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
  }
};
