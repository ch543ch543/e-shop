/** @type {import('next').NextConfig} */
// const withLess = require("next-plugin-antd-less");
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // Or better still you can specify a path to a file 
  lessVarsFilePath: './styles/custom_ant_ui/style.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: true,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...
  // webpack(config) {
  //   return config;
  // },
  reactStrictMode: true,
  swcMinify: true,
  lessLoaderOptions: {},
});


// module.exports = withAntdLess({
//   reactStrictMode: true,
//   swcMinify: true,
//   lessLoaderOptions: {},
// });
