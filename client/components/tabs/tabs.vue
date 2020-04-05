<script>
import TabContainer from './tab-container.vue'
export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  props: {
    // 用于控制显示第几个tab
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: [] // 记录所有tab中的content
    }
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  render () {
    // 直接使用JSX语法
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  }
}
</script>


<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
