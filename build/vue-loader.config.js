module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 防止template当中的空格对渲染产生影响
    extractCSS: !isDev, // vue默认是将.vue文件当中的样式打包到js当中的，那样效率更快，但是如果你希望把.vue文件中的样式在首屏加载的时候就全部加载，这里设置true就可以
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
}
