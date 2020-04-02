const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')

const clientManifest = require('../../public/vue-ssr-client-manifest.json')

// 正式环境一次性创建好，后续都用同一个render
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname,'../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async(ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
