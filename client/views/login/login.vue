<template>
  <div>this is login page</div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Login Page'
  },
  beforeRouteEnter (to, from, next) {
    console.log('login beforeRouterEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('login beforeRouterUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('login beforeRouterLeave')
    next()
  }
}
</script>
