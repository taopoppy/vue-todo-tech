import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <ul v-for="(value, name, index) in obj">
        <li>{{index}}: {{name}}-{{value}}</li>
      </ul>
    </div>
  `,
  data: {
    obj: {
      name: 'taopoppy',
      age: 19,
      sex: 'man'
    }
  }
})
