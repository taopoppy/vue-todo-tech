<script>
export default {
  name: 'Tab',
  props: {
    // 用于给当前tab做标记
    index: {
      required: true,
      type: [String, Number]
    },
    // 用于显示tab当中的内容
    label: {
      type: String,
      default: 'tab'
    }
  },
  mounted () {
    this.$parent.panes.push(this) // 将自己整个的内容添加到父组件的数组中
  },
  computed: {
    // 标记当前tab是否是显示状态
    active () {
      return this.$parent.value === this.index
    }
  },
  methods: {
    handeClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handeClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
</style>
