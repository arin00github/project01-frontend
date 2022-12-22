/* eslint-disable no-use-before-define */
import path from "path";
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";
// 이 내용이 없으면, devServer 이하 내용에 대하여 에러 발생함
import "webpack-dev-server";

const config: Configuration = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].[contenthash].js",
    publicPath: "/monitoring/app/",
  },
  entry: "./src/render/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: "file-loader",
      //   options: {
      //     name: "assets/images/[name].[ext]",
      //   },
      // },
    ],
  },
  resolve: {
    alias: {
      Component: path.resolve(__dirname, "../src/render/component/"),
      Page: path.resolve(__dirname, "../src/render/page/"),
      Store: path.resolve(__dirname, "../src/render/store/"),
      //Assets: path.resolve(__dirname, "../src/render/assets/"),
      Types: path.resolve(__dirname, "../src/render/types/"),
      Layout: path.resolve(__dirname, "../src/render/layout/"),
      Api: path.resolve(__dirname, "../src/render/api/"),
      Utils: path.resolve(__dirname, "../src/render/utils/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new HotModuleReplacementPlugin(),
    // new DefinePlugin({
    //   "process.env": JSON.stringify(process.env),
    // }),
    new DotenvWebpack(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CopyPlugin({
      patterns: [
        // { from: "src/render/assets", to: "assets" },
        // { from: "public/authenticate.json", to: "authenticate.json", noErrorOnMissing: true },
        { from: "public/favicon.ico", to: "favicon.ico", noErrorOnMissing: true },
      ],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: {
      index: "/monitoring/app/",
    },
    port: 4700,
    open: true,
    hot: true,
    proxy: {
      "/monitoring/auth": { changeOrigin: true, target: "https://manage-20-214-188-126.vurix.kr" },
      "/monitoring/api": { changeOrigin: true, target: "https://manage-20-214-188-126.vurix.kr" },
    },
  },
};

export default config;
