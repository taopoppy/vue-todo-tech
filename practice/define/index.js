import Vue from 'vue'

const component = {
  props: {
    active: Boolean
  },
  template: `
    <div v-show="active">{{text}}</div>
  `,
  data () {
    return {
      text: 123
    }
  }
}
const component2 = {
  extends: component,
  data () {
    return {
      text: 234
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  template: `
    <comp :active="true"></comp>
  `
})

// const CompVue = Vue.extend(component)
// new CompVue({
//   el: '#root',
//   propsData: {// 这里就必须使用propsData，而不是props
//     active: true
//   },
//   data: {// data如果和component中的data有重复就会覆盖
//     text: 234
//   }
// })
