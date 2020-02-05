import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: '<div>{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

setInterval(() => {
  app.$data.text += 1
  if (app.$data.text === 3) {
    app.$set(app.obj, 'a', 3)
  }
}, 1000)
