<template>
  <div class="content">
    <SplitScreenLayout>
      <template #left>
        <div class="swiper-nav">
          <button type="button" class="swiper-nav-prev" @click="slideTo(swiperAllOptions.activeIndex - 1)">
            <arrowRight />
          </button>
          <button type="button" class="swiper-nav-loupe" @click="$viewerApi({images})">
            <loupe />
          </button>
          <button type="button" class="swiper-nav-next" @click="slideTo(swiperAllOptions.activeIndex + 1)">
            <arrowRight />
          </button>
        </div>
        <swiper ref="reviewsDocs" class="reviewsDocs" :options="{...swiperAllOptions, ...swiperLeftOptions}" :auto-destroy="false">
          <swiper-slide v-for="(item, i) in pageContent" :key="i" v-viewer.static class="reviewsDocs__item" :style="{backgroundImage: `url(${images[i]}`}">
            <img :src="images[i]" alt="">
          </swiper-slide>
        </swiper>
      </template>
      <template #right>
        <div @mousewheel.prevent="onWheel">
          <swiper ref="reviews" class="reviews" :options="{...swiperAllOptions, ...swiperRightOptions}" :auto-destroy="false" @slideChange="onSlideChange">
            <div class="mouse">
              <span />
            </div>
            <swiper-slide v-for="item in pageContent" :key="item.title" class="reviews__item flex flex-col">
              <h2>{{ item.title }}</h2>
              <span>Адрес: <a :href="item.link">{{ item.link }}</a></span>
              <span>{{ item.services }}</span>
              <p>{{ item.body }}</p>
              <div class="reviews__author flex left">
                <img :src="require('~/assets/img/' + item.logo )" :alt="item.title">
                <div class="flex flex-col s-e">
                  <span>{{ item.authorName }}</span>
                  <span>{{ item.authorPost }}</span>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div ref="swiperPagination" class="swiper-pagination dark">
            <div v-for="(item, i) in pageContent" :key="i" class="swiper-pagination-item" :class="{'swiper-pagination-item-active': swiperAllOptions.activeIndex === (i)}" @click="slideTo(i)">
              {{ i + 1 }}
            </div>
            <span ref="mark" class="mark">-</span>
          </div>
        </div>
      </template>
    </SplitScreenLayout>
  </div>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

import arrowRight from '~/assets/icons/arrowRight.svg?inline'
import loupe from '~/assets/icons/loupe.svg?inline'

export default {
  name: 'ReviewsPage',
  components: { arrowRight, loupe, SplitScreenLayout },
  mixins: [getAsyncPageContent],
  data () {
    return {
      images: [],
      swiperAllOptions: {
        initialSlide: 0,
        activeIndex: 0,
        slidesPerView: 'auto',
        preventInteractionOnTransition: true,
        followFinger: false,
        centeredSlides: true,
        speed: 1000,
        observer: true
      },
      swiperRightOptions: {
        direction: 'vertical'
      },
      swiperLeftOptions: {
        allowTouchMove: false,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      }
    }
  },
  mounted () {
    this.getImages()
    this.setStyleForSwiperPaginationMark()
  },
  methods: {
    getImages () {
      for (let c = 0; c < this.pageContent.length; c++) {
        this.images[c] = require('~/assets/img/' + this.pageContent[c].doc)
      }
    },
    slideTo (i) {
      this.$refs.reviews.$swiper.slideTo(i)
      this.$refs.reviewsDocs.$swiper.slideTo(i)
    },
    onWheel (event) {
      if (event.deltaY > 0) {
        this.slideTo(this.swiperAllOptions.activeIndex + 1)
      } else {
        this.slideTo(this.swiperAllOptions.activeIndex - 1)
      }
    },
    onSlideChange () {
      this.swiperAllOptions.activeIndex = this.$refs.reviews.$swiper.activeIndex
      this.setStyleForSwiperPaginationMark()
    },
    setStyleForSwiperPaginationMark () {
      const swiperPaginationLength = Object.keys(this.pageContent).length
      const swiperPaginationHeight = this.$refs.swiperPagination.clientHeight - 10
      this.$refs.mark.style.cssText = 'transform:translateY(' + (swiperPaginationHeight / swiperPaginationLength) * (this.swiperAllOptions.activeIndex) + 'px)'
    }
  }
}
</script>
