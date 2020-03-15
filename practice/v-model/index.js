import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput1" :value="value1">
    </div>
  `,
  methods: {
    handleInput1 (e) {
      this.$emit('change', e.target.value)
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
      value: '1'
    }
  },
  template: `
    <div>
      <comp-one :value1="value" @change="value = arguments[0]"></comp-one>
    </div>
  `
})
