const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        process: require.resolve('process/browser'), // Polyfill for 'process'
        url: require.resolve('url/'), // Polyfill for 'url'
        net: false, // Disable 'net' module for browser builds
        http: require.resolve('stream-http'), // Polyfill for 'http'
        https: require.resolve('https-browserify'), // Polyfill for 'https' if needed
        fs: false, // Disable 'fs' module for browser builds
        zlib: require.resolve('browserify-zlib'), // Polyfill for 'zlib'
        querystring: require.resolve('querystring-es3'), // Polyfill for 'querystring'
        assert: require.resolve('assert/'),  // Polyfill for 'assert'
        buffer: require.resolve('buffer/'), // Polyfill for 'buffer'
        stream: require.resolve('stream'), // Polyfill for 'stream'
        path: require.resolve('path'), // Polyfill for 'path'
        crypto: require.resolve('crypto-browserify') // Polyfill for 'crypto'
      };

      // Add the ProvidePlugin to make process global
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser', // Make 'process' global in the browser
        }),
      ];

      return webpackConfig;
    },
  },
};
