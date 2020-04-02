import Vue from 'vue'
import Component from './func-notification'

// 因为是方法调用组件，所以通过js去创建Vue组件
const NotificationConstructor = Vue.extend(Component)

const instances = [] // 记录生成instance的数量
let seed = 1 // 生成组件的id

// 用来升成一个NotificationConstructor
const notify = (options) => {
  if (Vue.prototype.$isServer) return

  // autoClose我们希望在组件中以data的方式传入，其他以props传入即可
  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    // 创建实例时传递 props。只用于 new 创建的实例中。
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() // 先不挂载，先不插入到DOM中，只生成一个$el的对象，或者只生成一个节点
  document.body.appendChild(instance.vm.$el) // 把节点假如到整个body当中，因为是个通知组件
  instance.vm.visible = true

  // 计算一个高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  // 监听点击关闭按钮的close事件
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })

  // 监听transition动画已经结束的closed事件
  instance.vm.$on('closed', () => {
    // 进行删除节点的操作
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除DOM节点
    instance.vm.$destroy() // 删除vm对象
  })
  // 返回这个Vue实例
  return instance.vm
}

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  // 找到实例在数组中的位置
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height // 拿到Notification的高度
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

export default notify
