 var path = require('path');
 var webpack = require('webpack');
 const loaders = require('./loaders');
 var CompressionPlugin = require('compression-webpack-plugin');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
        rules: [
          loaders.JSLoader,
          loaders.CSSLoader,
          loaders.FileLoader,
        ]
     },
     plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin()
     ],
     optimization: {
        minimizer: [new UglifyJsPlugin()]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };