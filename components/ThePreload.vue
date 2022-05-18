<template>
  <div ref="preloadwrap" class="preload-wrap">
    <div class="preload">
      <div ref="preload__img" class="preload__img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePreload',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.preload()
      }
    }
  },
  methods: {
    // Анимация прелоада
    preload () {
      this.$refs.preloadwrap.classList.add('active')
      const w = this.$refs.preload__img.offsetWidth
      let t = 75
      setTimeout(() => {
        const i = setInterval(() => {
          this.$refs.preload__img.style.cssText = `transform: translateX(${-t}px)`
          t += 75
          if (t >= w + 100) {
            clearInterval(i)
            this.$refs.preloadwrap.classList.add('leave')
            setTimeout(() => {
              this.$refs.preloadwrap.classList.remove('leave')
              this.$refs.preloadwrap.classList.remove('active')
              this.$emit('hidePreload')
            }, 200)
          }
        }, 35)
      }, 400)
    }
  }
}
</script>
