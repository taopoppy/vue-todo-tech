const Router = require('koa-router')

const send = require('koa-send')

// 只会处理public开头的路径请求
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx ,ctx.path)
})

module.exports = staticRouter
