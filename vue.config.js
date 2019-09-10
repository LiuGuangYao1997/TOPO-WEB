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
        port: 8001
    }
}

const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}