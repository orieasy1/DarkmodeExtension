const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { EvalDevToolModulePlugin } = require("webpack");

module.exports = {
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/ui/popupUI.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "manifest.json", to: "." }
      ]
    })
  ],
  mode: "production",
  devtool: false
};
