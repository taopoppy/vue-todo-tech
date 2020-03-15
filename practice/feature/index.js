import Vue from 'vue'

// 具名插槽
// const component = {
//   template: `
//     <div :style="style">
//       <div class="header">
//         <slot name="header"></slot>
//       </div>
//       <div class="body">
//         <slot name="body"></slot>
//       </div>
//     </div>
//   `,
//   data () {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       }
//     }
//   }
// }

// 作用域插槽
// const component = {
//   template: `
//     <div :style="style">
//       <slot name="one" :sex="sex" ></slot>
//       <slot name="two" :msg="msg"></slot>
//     </div>
//   `,
//   data () {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       },
//       msg: 'taopoppy',
//       sex: 'man'
//     }
//   }
// }

// provender
const ChildComponent = {
  template: '<div>child component {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted () {
    //
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  props: ['value'],
  template: `
    <div :style="style">
      <p>component {{value}}</p>
      <slot :value="value" aaa="111" ></slot>
      <child-component/>
    </div>
  `,
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
  provide () {
    const data = {}
    // 给data的value属性创造get方法，每次调用都能重新去拿this.value，这也是vue中数据reactive的基础
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
  <div>
    <comp-one v-model="value">
      <span slot-scope="slotProps1">{{slotProps1.value}} {{slotProps1.aaa}}</span>
    </comp-one>
    <input type="text" v-model="value"/>
  </div>
  `
})
