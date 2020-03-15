import Vue from 'vue'

const component = {
  name: 'comp',
  props: ['props1'],
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      // 第一个参数是个字符串，表示创建元素标签的名称
      'div',
      // 第二个参数是个对象，表示这个标签上的属性
      {
        style: this.style,
        on: {
          click: () => { this.$emit('click') }
        }
      },
      // 第三个参数，如果是slot，直接使用this.$slots.具名插槽的名称
      [
        this.$slots.default,
        this.props1
      ]
    )
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'taopoppy'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  methods: {
    handClick () {
      console.log('Cliked')
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span.value)
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  render () {
    return this.$createElement(
      // 第一个参数是个字符串，表示创建元素标签的名称
      'comp-one',
      // 第二个参数是个对象，表示这个标签上的属性
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        on: {
          click: this.handClick
        }
      },
      // 第三个参数，如果标签中还有子节点，就是个数组，如果是值，就直接写值
      [
        this.$createElement('span', {
          ref: 'span'
        }, this.value)
      ]
    )
  }
})
