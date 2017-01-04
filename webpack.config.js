var webpack = require('webpack');
var yargs = require('yargs');

var options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

var babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      'react',
      'es2015',
      'stage-1',
    ],
    plugins: [
      'transform-decorators-legacy',
    ]
  }
};

var eslintLoader = {
  loader: 'eslint-loader',
  options: {
    configFile: "./.eslintrc",
    useEslintrc: false
  }
};

var config = {
  port: 8000,
  paths: {
      js: './src',
      dist: './dist',
      mainJs: './src/main.js'
  }
};

var webpackConfig = {
  devtool: "source-maps",

  entry: {
    'index': config.paths.mainJs,
  },

  output: {
    path: config.paths.dist,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'QuickQuote',
  },

  externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "react-router": "ReactRouter"
  },

  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, use: [eslintLoader], exclude: [/node_modules/] },
      { test: /\.js$/, use: [babelLoader], exclude: [/node_modules/] }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ],

  devServer: {
    port: config.port
  }
};

module.exports = webpackConfig;
