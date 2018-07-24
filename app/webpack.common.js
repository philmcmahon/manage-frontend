const path = require("path");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");

const assetsPluginInstance = new AssetsPlugin({
  path: path.resolve(__dirname, "./dist/")
});

const definePlugin = new webpack.DefinePlugin({
  WEBPACK_BUILD: `'${process.env.TEAMCITY_BUILD}'` || "'NO BUILD SET'"
});

const nodeExternals = require("webpack-node-externals");

const common = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [definePlugin, assetsPluginInstance]
};

const server = merge(common, {
  entry: "./server/server",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
});

const client = merge(common, {
  entry: {
    csr: ["babel-regenerator-runtime", "./client/csr"],
    user: ["babel-regenerator-runtime", "./client/user"]
  },
  output: {
    path: path.resolve(__dirname, "dist", "static"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
});
module.exports = {
  client: client,
  server: server
};
