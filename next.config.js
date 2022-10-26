/** @type {import('next').NextConfig} */
// const withLess = require("next-plugin-antd-less");
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './styles/custom_ant_ui/style.less',
  lessVarsFilePathAppendToEndOfContent: true,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},
  reactStrictMode: true,
  swcMinify: true,
  lessLoaderOptions: {},
});