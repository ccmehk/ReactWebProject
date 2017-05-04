var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './main.js',

   output: {
      path: path.join(__dirname,'public'),
      filename: 'bundle.js',
      publicPath: '/public'
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
};
