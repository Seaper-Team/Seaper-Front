const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const UglifyParallelPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: {
    seaper: "./src/main.ts",
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]', 
              }
            },
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        rc: {
          name: "rc",
          test: (module) => (/rc-/.test(module.context)),
          priority: 4
        },
        react: {
          name: "react",
          test: (module) => (/react/.test(module.context) || /redux/.test(module.context)
            || /classnames/.test(module.context) || /prop-types/.test(module.context)),
          priority: 3
        },
        antd: {
          name: "antd",
          test: (module) => (/antd/.test(module.context) || /ant-design/.test(module.context)),
          priority: 2
        },
        default: {
          name: "other",
          test: (module) => (/node_modules/.test(module.context)),
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `rt-${entrypoint.name}`
    },
    minimizer:[
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: './index.html',
      chunks: "all"
    }),
    new MiniCssExtractPlugin(),
    //new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
        }
      ]
    }),
    new CleanWebPackPlugin(),
    new UglifyParallelPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        }
      }
    })
  ],
  mode: "production",
};