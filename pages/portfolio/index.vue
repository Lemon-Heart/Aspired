<template>
  <div class="content">
    <ScrollHorizontalLayout class="portfolio">
      <template #filters>
        <div ref="filters" class="filters">
          <div class="line-active" :style="{ width: filterLineWidth + 'px', left: filterLineLeft + 'px', top: filterLineTop + 'px' }" />
          <NuxtLink
            v-for="(filterItem, i) in filters"
            :key="i"
            class="filters__item"
            :class="{'active': filterItem === $route.query.filter || (filterItem === filters[0] && !$route.query.filter)}"
            :to="$route.path + '?filter=' + filterItem"
          >
            {{ filterItem }}
          </NuxtLink>
        </div>
        <!-- <TheFilters /> -->
      </template>
      <template #default>
        <transition-group name="portfolio" class="box__body--fake" tag="div">
          <div v-for="item in portfolioFiltred" :key="item.id" class="portfolio__item scrollHorizontal__item" :style="{ backgroundImage: 'url(' + require(`@/assets/img/${item.previewImg}`) + ')' }">
            <NuxtLink class="portfolio__link" :to="item.to">
              <div class="portfolio__head flex s-b">
                <span>{{ item.year }}</span>
                <div class="portfolio__arrow" />
              </div>
              <h3>{{ item.title }}</h3>
              <ul>
                <li v-for="(devItem, q) in item.developed" :key="q" class="">
                  {{ devItem }}
                </li>
              </ul>
            </NuxtLink>
          </div>
        </transition-group>
      </template>
    </ScrollHorizontalLayout>
  </div>
</template>

<script>
import ScrollHorizontalLayout from '~/layouts/ScrollHorizontalLayout.vue'

export default {
  name: 'PortfolioPage',
  components: { ScrollHorizontalLayout },
  async asyncData (context) {
    const portfolio = await context.$http.$get('/mock/portfolioFull.json')
    return { portfolio }
  },
  data () {
    return {
      // Фильтр, показыающий все элементы ДОЛЖЕН быть первым в массиве
      filters: ['Всё', 'Разработка', 'Интернет-маркетинг', 'Графический дизайн', 'Мобильные приложения'],
      filterLineWidth: 0,
      filterLineLeft: 0,
      filterLineTop: 0
    }
  },
  computed: {
    portfolioFiltred () {
      return this.portfolio.filter((item) => {
        if (!this.$route.query.filter || this.$route.query.filter === this.filters[0]) {
          return true
        } else {
          return item.developed.includes(this.$route.query.filter)
        }
      })
    }
  },
  watch: {
    $route () {
      setTimeout(function () {
        this.setStyleForFilterLine()
      }.bind(this), 150)
    }
  },
  mounted () {
    this.setStyleForFilterLine()
    window.addEventListener('resize', this.setStyleForFilterLine)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setStyleForFilterLine)
  },
  methods: {
    setStyleForFilterLine () {
      const activeFilter = this.$refs.filters.querySelector('.filters__item.active')
      this.filterLineWidth = activeFilter.offsetWidth
      this.filterLineLeft = activeFilter.offsetLeft
      this.filterLineTop = activeFilter.offsetTop + activeFilter.offsetHeight
    }
  }
}
</script>
