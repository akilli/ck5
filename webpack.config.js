'use strict';

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    devtool: 'source-map',
    performance: {hints: false},
    entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ckeditor.js',
        library: 'InlineEditor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: /^!/
                    }
                }
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
