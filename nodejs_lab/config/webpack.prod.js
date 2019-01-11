const _ = require('lodash');
const webpack = require('webpack');

const packageJSON = require('../package.json');

module.exports = (entry, output) => {
  return _.merge({}, require('./webpack.dev')(entry, output), {
    mode: 'production',
    output: {
      filename: output
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.BannerPlugin(
        `chavpjs v${packageJSON.version} | https://chavp.wordpress.com/@${packageJSON.version}/LICENSE.txt`
      )
    ]
  });
};
