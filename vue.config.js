const path = require('path');
const Url = require('./public/serverConfig.json');

module.exports = {


    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: 'dist',
    // 基本路径
    //打包public路径
    // assetsDir: 'public/static',
    assetsDir: 'public',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/alertRecordCount': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,
            },
            '/signin': {
                target: Url.loginURL,
                secure: false,
                changeOrigin: true,

            },
            '/users': {
                target: Url.userURL,
                secure: false,
                changeOrigin: true,

            },
            '/login': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/login': '/login'
                }
            },
            '/alertRecords': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,
            },
            '/admin': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,

            },
            '/biaojiRecords': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,

            },
            '/biaojiRecordCount': {
                target: Url.baseURL,
                secure: false,
                changeOrigin: true,
            },
            '/pictures': {
                target: Url.imgURL,
                secure: false,
                changeOrigin: true,
            },   

        }
    },
    // 是否开启css source map?
    css: {
        sourceMap: true
    }
}