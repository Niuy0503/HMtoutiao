const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 8888,
      open: true,
      host: 'localhost'
    }
  }
})
