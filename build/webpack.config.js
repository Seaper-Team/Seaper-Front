const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.ts",
  },
  output: {
    filename: "[name].js",
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
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
  ],
  mode: "production",
};