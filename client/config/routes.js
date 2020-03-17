
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // props: true,
    // path: '/app',
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   foot: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'the main page of application'
    },
    beforeEnter (to, from, next) {
      console.log('beforeEnter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
