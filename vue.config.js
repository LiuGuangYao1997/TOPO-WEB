module.exports={
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@static', resolve('src/static'))
    },
    devServer: {
        port: 8001,
    }
    /*devServer: {
        port: 8001,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '',//重写,
                }
            }
        },
    }*/
}

const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}