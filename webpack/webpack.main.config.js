const webpack = require('webpack');

const options = {
  entry: './src/index',
//  target: "electron-renderer",
  output: {
    filename: 'build.js',
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
          presets: ['latest-minimal', 'react']
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
