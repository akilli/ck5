'use strict';

const config = require('./webpack.config');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: [path.join(__dirname, 'demo')],
        host: '0.0.0.0',
        port: 8080,
        serveIndex: true,
    }
});
