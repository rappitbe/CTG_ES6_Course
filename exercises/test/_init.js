// We install source map support as early as possible, this to set stack trace line
// numbers right from the start, in case something would go wrong.
require('source-map-support/register');

// Install babel
require('babel-core/register')({
  ignore: /node_modules/,
  sourceMaps: 'inline'
});
require('babel-core/external-helpers');
require('babel-core/polyfill');
