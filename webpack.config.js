const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const SRC_PATH = path.resolve(`${__dirname}/`, 'src');
const DIST_PATH = path.resolve(`${__dirname}/`, 'public');
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const currentEnv = process.env.NODE_ENV || DEVELOPMENT;

module.exports = () => {
  return {
    name: 'math',
    devtool: 'source-map',
    target: 'web',
    mode: currentEnv,
    entry: {
      app: [ path.resolve(SRC_PATH, 'index.js') ],
    },
    output: {
      filename: '[name].bundle.js',
      path: DIST_PATH,
      publicPath: '/',
    },
    optimization: {
      minimize: currentEnv === PRODUCTION,
      minimizer: [ new TerserPlugin() ],
    },
    resolve: {
      extensions: [ '.js', '.json' ],
      modules: [
        'node_modules',
        SRC_PATH,
        '.',
      ],
      symlinks: false,
      cacheWithContext: false,
    },
    devServer: {
      compress: true,
      host: '0.0.0.0',
      port: 8080,
      open: true,
    },
    plugins: [
      new ExtractCssChunks(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        publicPath: '',
        template: path.resolve(SRC_PATH, 'index.pug'),
        minify: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/i,
          loader: 'pug-loader',
        },
        {
          test: /\.scss$/i,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
            },
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
            },
          ],
        },
      ],
    }
  }
};
