var path = require('path')
var process = require('process')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProdEnv = process.env.NODE_ENV === 'production'

var config = {
  entry: {
    app: [
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/')
        ],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.vue']
  }
}

if (isProdEnv) {
  // https://webpack.github.io/docs/cli.html#production-shortcut-p
  config.plugins.unshift(new webpack.optimize.OccurenceOrderPlugin())
  config.plugins.unshift(new webpack.optimize.UglifyJsPlugin())
} else {
  // https://webpack.github.io/docs/cli.html#development-shortcut-d
  config.debug = true
  config.devtool = '#source-map'
  config.output.pathInfo = true
}

module.exports = config
