const webpack = require('webpack');

const options = {
  entry: './srcEditor/index',
//  target: "electron-renderer",
  output: {
    filename: 'buildEditor.js',
    path: __dirname + '/../app/'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react',"es2015"]
        }
      },
      {
          test: /\.s?css$/,
          loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
        'electron'
    ])
]
};



module.exports = options;
