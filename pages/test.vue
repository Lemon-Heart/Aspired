<template>
  <div class="preload-wrap" @click="click">
    <div class="preload">
      <div ref="preload__img" class="preload__img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    click () {
      const w = this.$refs.preload__img.offsetWidth
      let t = 75
      const i = setInterval(() => {
        this.$refs.preload__img.style.cssText = `transform: translateX(${-t}px)`
        t += 75
        if (t >= w + 100) {
          clearInterval(i)
        }
      }, 35)
    }
  }
}
</script>

<style scoped lang="scss">
.preload-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  .preload {
    height: 75px;
    width: 75px;
    overflow: hidden;
    &__img {
      background: url('@/static/preload/preload_1.png');
      transform: translateX(0%);
      width: 4500px;
      height: 100%;
    }
  }
}
</style>
