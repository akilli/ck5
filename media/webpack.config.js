'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: path.resolve(__dirname, 'demo', 'config.js'),
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'ckeditor.js',
        library: 'ClassicEditor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: /^!/
                    }
                },
                extractComments: false
            })
        ]
    },
    plugins: [
        new CKEditorWebpackPlugin({
            language: 'de'
        })
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: true
                        })
                    }
                ]
            }
        ]
    }
};
