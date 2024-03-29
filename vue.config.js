/*
 * @Author: 赵宇
 * @Description: 
 * @Date: 2022-07-25 16:22:40
 * @LastEditTime: 2023-03-02 09:45:20
 * @LastEditors: zhao 13370229059@163.com
 * @FilePath: \yuanyibaozhuang\vue.config.js
 */
let proxy = null;
if (process.env.NODE_ENV === 'development') {
  proxy = {
    '/api': {
      target: 'https://yy.yiyuanmaidian.com/v1/api', // 你请求的第三方接口 https://www.gendanwang.com/v1/api
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: {
        // 路径重写，
        '^/api': '/' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
      }
    }
  };
}
module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  parallel: true, // 多核编译，加快编译、打包速度
  devServer: {
    port: 8080,
    proxy: proxy
  },
  configureWebpack: config => {
    config['externals'] = {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'axios',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      xlsx: 'xlsx'
    };
  }
};
