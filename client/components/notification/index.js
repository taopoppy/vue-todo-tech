import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  // 全局注册组件的方法一，使用Vue.component
  Vue.component(Notification.name, Notification)
  // 全局注册组件的方法二，在Vue.prototype上添加的属性，在组件中直接可以通过this.xxx使用
  Vue.prototype.$notify = notify
}
