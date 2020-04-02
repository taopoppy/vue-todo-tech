import createApp from './create-app'

const { app, router } = createApp()

// 等到router.onReady的时候才去做真正的服务端渲染
router.onReady(() => {
  app.$mount('#root')
})
