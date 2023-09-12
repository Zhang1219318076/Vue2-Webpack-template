const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);

module.exports = {
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.BASE_URL,
  outputDir: IS_PROD == "development" ? "dist" : "dist/test/",
  assetsDir: "static",
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "~@/styles/index.less";
      `,
      },
    },
  },
  chainWebpack: (config) => {
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 优化二次启动速度
    config.cache({
      // 将缓存类型设置为文件系统,默认是memory
      type: "filesystem",
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename],
      },
    });
    // 作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低
    config.optimization.runtimeChunk("single");
    // 本地调试 config.devtool("cheap-source-map") 调试模式
    config.when(IS_DEV, (config) => config.devtool("cheap-source-map"));
  },
  configureWebpack: {
    output: {
      filename: `static/js/[name].[hash].js`,
      chunkFilename: `static/js/[name].[hash].js`,
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          format: {
            comments: false,
          },
          compress: {
            drop_debugger: IS_PROD ? true : false, // 注释console
            drop_console: IS_PROD ? true : false,
            pure_funcs: IS_PROD ? ["console.log"] : [], // 移除console
          },
        },
        extractComments: false, // 是否将注释提取到一个单独的文件中
        parallel: true, // 是否并⾏打包
      }),
      // gzip
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8,
      }),
      //
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 10 }),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000,
      }),
    ],
  },
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    open: true,
    hot: true,
    port: 8080,
    proxy: createProxy(JSON.parse(process.env.VUE_APP_BASE_HOST)),
  },
};

function createProxy(env) {
  const mapProxy = new Map(env);
  const ret = {};
  for (const [key, value] of mapProxy.entries()) {
    console.log(key, value);
    const isHttps = /^https:\/\//.test(value);
    ret[key] = {
      ws: true,
      target: value,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(new RegExp(`^${key}`), ""),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  console.log(ret);
  return ret;
}
