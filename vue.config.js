const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
  publicPath: process.env.NODE_ENV == "development" ? "/" : "./",
  lintOnSave: 'error',
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    disableHostCheck: true,
    hotOnly: true,
    proxy: {
      "/api": {
        // target: "http://192.168.255.207:53000/api",  //测试
        target: "http://192.168.1.240:53000/api", //开发
        // target: "http://10.220.202.31:53000/api",//zhaopin
        // target: "http://10.220.202.69:53000/api", //hanjinyuan
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: "#EB1C1D",
          blue: "#2688FC",
          orange: "#f08d49",
          black: "#282828",
          "border-color": "#EFEFEF",
          "text-color": "#282828",
          "background-color": "#F6F7FA"
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ["van-circle__layer"]
          })
        ]
      }
    }
  },
  configureWebpack: {
    //警告 webpack 的性能提示
    performance: {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    }
  }
};
