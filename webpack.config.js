'use strict'

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: [require('babel-plugin-transform-object-rest-spread')],
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.(mp3|txt|png|jpg|gif|svg)$/,
        include: path.resolve(__dirname, './src'),
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: "bundle.css"
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        compress: false
      }
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
