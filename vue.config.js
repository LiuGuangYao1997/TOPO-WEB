/**
 *  @author liu.guangyao
 *  @date 2019/9/10 16:30
 */

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    assetsDir: 'static',
    // 输出文件目录
    outputDir: 'vue-dmeo',
    publicPath: '/vue-dmeo/',
    transpileDependencies: ['_ant-design-vue@1.3.10@ant-design-vue', 'ant-design-vue'],//兼容ie10设置
    configureWebpack: {},

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@static', resolve('src/static'))
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */

                    /*
                    'primary-color': '#F5222D',
                    'link-color': '#F5222D',
                    'border-radius-base': '4px',
                    */
                },
                javascriptEnabled: true,
            }
        }
    },

    devServer: {
        // 设置代理 代理只在本地测试环境上生效 要是在生产环境上生效需在生产环境上配置Nginx
        port: 8001,
        /*proxy: {
            "/api": {
                target: "http://192.168.80.138:8002", // 访问数据的计算机域名
                // target: "http://localhost:8002", // 访问数据的计算机域名
                ws: false, // 是否启用websockets
                changOrigin: true, //开启代理
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }*/
    },

    lintOnSave: undefined
}