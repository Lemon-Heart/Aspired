<template>
  <splitpanes v-show="width" :horizontal="width < 1181" :dbl-click-splitter="false">
    <pane class="customScroll" :min-size="lefttMinSize" :size="leftSize">
      <slot name="left" />
    </pane>
    <pane :min-size="rightMinSize" :size="rightSize">
      <TheBreadcrumbs />
      <div ref="paneContent" class="paneContent customScroll" :class="{'ovf': $route.path === '/reviews'}">
        <slot :parent="parent" name="right" />
      </div>
      <button ref="scrollButton" type="button" class="scroll-button" @click="toTop" />
      <div v-if="$route.meta.link" class="link">
        <nuxt-link :to="$route.meta.link">
          Перейти в портфолио
        </nuxt-link>
      </div>
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'

export default {
  name: 'SplitScreenLayout',
  components: { Splitpanes, Pane },
  layout: 'default',
  data () {
    return {
      parent: null,
      width: 0,
      lefttMinSize: 5,
      rightMinSize: 30,
      leftSize: 50,
      rightSize: 50
    }
  },
  mounted () {
    this.parent = this.$refs.paneContent
    this.parent.addEventListener('scroll', this.btnClass)
    window.addEventListener('resize', this.updateWidth)
    this.updateWidth()
  },
  beforeDestroy () {
    this.parent.removeEventListener('scroll', this.btnClass)
    window.removeEventListener('resize', this.updateWidth)
  },
  methods: {
    setSizes () {
      if (this.width < 1181) {
        if (this.$route.path === '/reviews') {
          this.rightMinSize = 50
          this.lefttMinSize = 15
        }
        this.leftSize = 20
        this.rightSize = 80
      } else {
        if (this.$route.path === '/reviews') {
          this.rightMinSize = 45
          this.lefttMinSize = 45
        }
        this.leftSize = this.rightSize = 50
      }
    },
    updateWidth () {
      this.width = window.innerWidth
      this.setSizes()
    },
    toTop () {
      if (this.$refs.scrollButton.classList.contains('toTop')) {
        this.parent.scrollTop = 0
      }
    },
    btnClass () {
      if (this.parent.scrollHeight - this.parent.scrollTop <= this.parent.clientHeight + 1) {
        this.$refs.scrollButton.classList.add('toTop')
      } else {
        this.$refs.scrollButton.classList.remove('toTop')
      }
    }
  }
}
</script>
