const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const fs = require('fs')

const VueServerRenderer = require('vue-server-renderer')
const path = require('path')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

// node当中要将webpack跑起来
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()

// MemoryFs和node中的fs的api一样，还扩展了一些
// MemoryFs的用处是将文件输出写入内存而不是磁盘
// webpack打包，编译都依赖于大量的临时文件写入写出，全部都写入磁盘会浪费性能和时间
serverCompiler.outputFileSystem = mfs

// 记录每次webpack打包的文件
let bundle

// 监听文件的修改，webpack重新打包
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => { console.log(err) })
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // 通过VueServerPlugin打包出来是个json文件
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log(`new bundle generated`)
})

// 书写一个中间件，帮助我们处理服务端渲染返回的东西
// 只需要在ctx.body上挂载我们要返回的html的内容
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '稍等一会,别着急...'
    return
  }

  // 从客户端（8000端口）拿到打包好的js的路径
  const clientManifestResp = await axios.get(
    `http://127.0.0.1:8000/public/vue-ssr-client-manifest.json`
  )
  const clientManifest = clientManifestResp.data

  // 开始进行服务端渲染的过程
  // 因为通过VueServerPlugin渲染出来只是一个完整html文件中的body部分，其他头部，mete信息我们要有模板
  // 我们就自己通过ejs去创建一个模板
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  // 自动生成一个带有script标签的js文件引用的字符串，可以直接填到ejs中
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
// 所有的请求都用这个中间件处理
router.get('*', handleSSR)

module.exports = router
