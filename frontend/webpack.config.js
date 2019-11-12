var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin(
  {
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
  }
);

module.exports = {
  entry: __dirname + '/app/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(gif|jpg|png|eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader"
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
