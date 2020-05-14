module.exports = {
    // 当使用 pages 选项构建多页面应用时。
    // baseUrl:"",
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
    // outputDir: 'dist',
    // // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: 'src/assets',
    // // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // indexPath: 'index.html',
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing: true,
    // 多页面
    pages: undefined,
    // 编译警告
    lintOnSave: false,
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies: [],
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    crossorigin: undefined,
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
    integrity: false,
    // 反向代理
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0', // 不清楚主机和目的网络
        port: 1111, // 源地址端口，自行修改
        hotOnly: false,
        useLocalIp: false,
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: '1',
    //         ws: true,
    //         changeOrigin: true
    //       }
    //     }
    // }
    },
};

//
// const webpack = require("webpack");
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];
// require("babel-polyfill");
// module.exports = {
//     publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
//     // publicPath: process.env.NODE_ENV === 'production' ? 'http://47.92.237.225:8080/dist' : './',
//     outputDir: 'dist',//打包后的目录名称
//     assetsDir: 'static',//静态资源目录名称
//     productionSourceMap: false,  //去掉打包的时候生成的map文件
//     lintOnSave: true,
//     filenameHashing: false,
//     devServer: {
//         //sockHost: 'http://47.92.237.225:1111/',
//         disableHostCheck: true,
//         host: '0.0.0.0',  //不清楚主机和目的网络
//         port: 1111, // 源地址端口，自行修改
//         disableHostCheck: true,
//         hotOnly: false,
//         useLocalIp: false,
//         proxy: Object = {
//             // '/ser':{
//             //     target:'http://127.0.0.1:8080/',  //跨域的域名
//             //     ws: true,  // 代理 websockets
//             //     changeOrigin: true, //是否开启跨域
//             //     pathRewrite:{
//             //         '^/ser':'/'  // 重写地址
//             //     }
//             // },
//             // headers: {
//             //     'Access-Control-Allow-Origin': '*',
//             // }
//         },
//         // configureWebpack: {
//         //     plugins: [
//         //         // 配置jquery
//         //         new webpack.ProvidePlugin({
//         //             $: "jquery",
//         //             jQuery: "jquery",
//         //             "window.jQuery": "jquery",
//         //             Popper: ["popper.js", "default"]
//         //         }),
//         //         new CompressionWebpackPlugin({
//         //             asset: '[path].gz[query]',
//         //             algorithm: 'gzip',
//         //             test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),  //匹配文件名
//         //             // test: /\.js$|\.html$|.\css/,
//         //             threshold: 10240,  //对超过10k的数据压缩
//         //             minRatio: 0.8,
//         //             deleteOriginalAssets: false  //不删除源文件
//         //         })
//         //     ]
//         // }
//     }
// }
