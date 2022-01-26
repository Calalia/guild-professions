const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./src/assets"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.p?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: "index.html" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets" }],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
