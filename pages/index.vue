<template>
  <div>
    <swiper ref="mainSlider" class="mainSlider" :auto-destroy="false" :options="swiperOptions" @slideChange="onSlideChange">
      <swiper-slide class="mainScreen">
        <div class="mainScreen__main">
          <h1>{{ indexContent.h1 }}</h1>
          <p>{{ indexContent.h2 }}</p>
          <NuxtLink class="btn" to="/development">
            Посмотреть
          </NuxtLink>
          <div class="mainScreen__contacts">
            <div>
              <span>{{ contactsContent.contacts.phoneANDmail.title }}</span>
              <a :href="toTel(contactsContent.contacts.phoneANDmail.phone)">{{ contactsContent.contacts.phoneANDmail.phone }}</a>
              <a :href="'mailto:' + contactsContent.contacts.phoneANDmail.mail">{{ contactsContent.contacts.phoneANDmail.mail }}</a>
            </div>
            <div>
              <span>{{ contactsContent.contacts.adress.title }}</span>
              <span>{{ contactsContent.contacts.adress.adress }}</span>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide v-for="(item, i) in indexContent.portfolio" :key="i" class="mainScreen mainScreen--section">
        <div class="mainScreen__portfolio">
          <div class="mainScreen__left">
            <h2>{{ item.title }}</h2>
            <ul>
              <li v-for="(itemDeveloped, q) in item.developed" :key="q">
                {{ itemDeveloped }}
              </li>
            </ul>
            <nuxt-link :to="item.to" class="btn">
              Посмотреть
            </nuxt-link>
          </div>
          <div class="mainScreen__right" :style="{ backgroundImage: 'url(' + require(`@/assets/img/${item.img}`) + ')' }" />
        </div>
      </swiper-slide>
    </swiper>
    <transition name="translateToLeft">
      <div v-if="swiperOptions.activeIndex > 0" ref="swiperPagination" class="swiper-pagination">
        <div v-for="(item, i) in indexContent.portfolio" :key="i" class="swiper-pagination-item" :class="swiperOptions.activeIndex === (i + 1) ? 'swiper-pagination-item-active' : ''" @click="$refs.mainSlider.$swiper.slideTo(i + 1)">
          {{ i + 1 }}
        </div>
        <span ref="mark" class="mark">-</span>
      </div>
    </transition>
    <button ref="scrollButton" type="button" class="scroll-button" @click="$refs.mainSlider.$swiper.slideNext()" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData (context) {
    const indexContent = await context.$http.$get('/mock/index.json')
    const contactsContent = await context.$http.$get('/mock/contacts.json')
    return { indexContent, contactsContent }
  },
  data () {
    return {
      swiperOptions: {
        initialSlide: 0,
        activeIndex: 0,
        direction: 'vertical',
        preventInteractionOnTransition: true,
        followFinger: false,
        speed: 1000,
        mousewheel: true
      }
    }
  },
  methods: {
    toTel: tel => tel.replace(/[^+\d]/g, ''),
    onSlideChange () {
      const oldIndex = this.swiperOptions.activeIndex
      this.swiperOptions.activeIndex = this.$refs.mainSlider.$swiper.activeIndex
      this.swiperOptions.activeIndex > oldIndex ? this.$refs.scrollButton.classList.add('active') : this.$refs.scrollButton.classList.remove('active')
      setTimeout(() => this.$refs.scrollButton.classList.remove('active'), 500)
      this.swiperPaginationMark(oldIndex)
    },
    swiperPaginationMark (oldIndex) {
      const swiperPaginationLength = Object.keys(this.indexContent.portfolio).length
      if (oldIndex !== 0) {
        const swiperPaginationHeight = this.$refs.swiperPagination.clientHeight - 10
        this.$refs.mark.style.cssText = 'transform:translateY(' + (swiperPaginationHeight / swiperPaginationLength) * (this.swiperOptions.activeIndex - 1) + 'px)'
      }
    }
  }
}
</script>

<style scoped lang="scss">
h1, h2 {
  color: white;
  font-family: 'Roboto-Slab';
}
p {
  display: block;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  margin: 20px 0 30px;
}
</style>
