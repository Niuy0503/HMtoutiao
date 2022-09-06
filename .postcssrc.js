// 所有的postcss的插件都是一个函数
const pxtorem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxtorem({
      //根节点字体大小
      //如果是vant-37.5，自己写的代码是75
      // file当前编译的css文件路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有属性都转成rem
    })
  ]
}
