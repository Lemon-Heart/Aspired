<template>
  <div class="counter">
    <div class="counter__number">
      {{ val }}
    </div>
    <div class="counter__text">
      {{ text }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppCounter',
  props: {
    max: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    parent: {}
  },
  data: () => ({
    val: 0
  }),
  mounted () {
    this.parent.addEventListener('scroll', this.onScroll)
    this.$on('hook:beforeDestroy', this.removeScrollHandler)
    this.onScroll()
  },
  methods: {
    onScroll () {
      if (this.$el.offsetTop - this.$el.offsetHeight < this.parent.scrollTop + this.parent.offsetHeight) {
        this.removeScrollHandler()
        const interval = setInterval(() => {
          if (++this.val === this.max) {
            clearInterval(interval)
          }
        }, 2000 / this.max)
      }
    },
    removeScrollHandler () {
      this.parent.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
