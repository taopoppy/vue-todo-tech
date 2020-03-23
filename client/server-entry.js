import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    // 当我们把服务端所有的api实现完成之后，进行异步请求的时候才会用到store
    // const { app, router, store } = createApp()
    const { app, router } = createApp()

    // 路由推进一条记录
    router.push(context.url)
    // 路由当中所有异步操作完成之后,onReady方法只有在服务端渲染的时候用
    router.onReady(() => {
      // 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。通常在服务端渲染的数据预加载时使用
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
