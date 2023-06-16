const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.ts",
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
          "style-loader",
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
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 8087,
    proxy: {
      '/api': 'http://127.0.0.1:8088'
    },
  },
  mode: "development",
};