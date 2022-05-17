<template>
  <div ref="box" class="box">
    <div class="box__head">
      <TheBreadcrumbs :class="{'portfolio': $route.name === 'Портфолио'}" />
      <slot v-if="$route.meta.filters" name="filters" />
    </div>
    <div
      ref="scrollHorizontal"
      class="box__body"
      :style="{transform: `translateX(${translateX}px)`, width: `${width}px`}"
      @mousewheel.prevent="onWheel"
      @touchmove="touchmove"
      @touchstart="touchstart"
      @touchend="e = null"
    >
      <slot />
    </div>
    <div class="box__range" :class="{'hide': !maxTranslateX}">
      <input v-model="revertTranslateX" type="range" min="0" :max="maxTranslateX">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollHorizontalLayout',
  data () {
    return {
      translateX: 0,
      width: 0,
      maxTranslateX: 0,
      e: null,
      scroll: true
    }
  },
  computed: {
    revertTranslateX: {
      get () {
        return this.translateX * -1
      },
      set (val) {
        this.translateX = val * -1
      }
    },
    revertMaxTranslateX () {
      return this.maxTranslateX * -1
    }
  },
  watch: {
    $route () {
      setTimeout(() => {
        this.setWidth()
        this.setMaxTranslateX()
        if (this.revertTranslateX > this.maxTranslateX) {
          this.revertTranslateX = this.maxTranslateX
        }
      }, 1050)
    }
  },
  mounted () {
    this.setWidth()
    this.setMaxTranslateX()
    window.addEventListener('resize', this.setMaxTranslateX)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setMaxTranslateX)
  },
  methods: {
    setWidth () {
      const el = this.$refs.scrollHorizontal.querySelectorAll('.scrollHorizontal__item')
      this.width = 0
      for (let c = 0; c < el.length; c++) {
        const marginLeft = parseInt(getComputedStyle(el[c], true).marginLeft)
        const marginRight = parseInt(getComputedStyle(el[c], true).marginRight)
        this.width += (el[c].offsetWidth + marginLeft + marginRight)
      }
    },
    setMaxTranslateX () {
      const maxTranslateX = this.width - this.$refs.box.offsetWidth
      if (maxTranslateX < 1) {
        this.maxTranslateX = 0
      } else {
        this.maxTranslateX = maxTranslateX
      }
    },
    onWheel (event) {
      if (this.scroll) {
        this.scroll = false
        if (event.deltaY > 0) {
          this.translateX -= 500
          if (this.revertTranslateX > this.maxTranslateX) {
            this.translateX = this.revertMaxTranslateX
          }
        } else {
          this.translateX += 500
          if (this.translateX >= 0) {
            this.translateX = 0
          }
        }
      }
      setTimeout(() => {
        this.scroll = true
      }, 150)
    },
    touchmove (event) {
      if (this.e) {
        const direction = event.touches[0].pageX - this.e.touches[0].pageX
        if (direction < -10) {
          if (this.revertTranslateX < this.maxTranslateX) {
            this.translateX -= direction * -1 / 10
          } else {
            this.translateX = this.revertMaxTranslateX
          }
        }
        if (direction > 10) {
          if (this.translateX >= 0) {
            this.translateX = 0
          } else {
            this.translateX += direction / 10
          }
        }
      }
    },
    touchstart (event) {
      this.e = event
    }
  }
}
</script>
