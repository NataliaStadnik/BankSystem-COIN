const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env) => ({
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults',
                },
              ],
            ],
          },
        },
      },

      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.scss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 2,
              },
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.svgoMinify,
          options: {
            encodeOptions: {
              multipass: true,
              plugins: ['preset-default'],
            },
          },
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coin',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    static: {
      directory: './src',
    },
  },
});
