const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  // 这个context对象是传入到VueServerRender中的
  // VueServerRender渲染完成之后会在context对象上插入一系列属性
  // 包括客户端js的路径，css路径，还有头部信息
  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context)

    // 渲染出html
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(), // 拿到带有style的整个标签
      scripts: context.renderScripts() // 拿到带有script的整个标签
    })

    // 返回给客户端我们的html内容
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
