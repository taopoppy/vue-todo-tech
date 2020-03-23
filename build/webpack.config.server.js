const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node', // 必须要配置，因为打包出来的东西要在node环境跑
  entry: path.join(__dirname, '../client/server-entry.js'), // 修改新的路径
  devtool: 'source-map', // 修改devtools的方式
  output: {
    libraryTarget: 'commonjs2', // 通过module.export的形式将代码导出，因为是跑在node端
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies), // 因为vue，vuex和vue-router都在node_modules中，不需要打包进入server-entry.js
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader', // 由于vue-style-loader有DOM操作，我们需要将css代码分离出去
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"' // 官方推荐的配置，可能在插件中会用到
    }),
    new VueServerPlugin() // 使用最重要的插件，可以通过{filename:'xxx'}指定打包后的文件名。默认是vue-ssr-server-bundle.json
  ]
})

module.exports = config
