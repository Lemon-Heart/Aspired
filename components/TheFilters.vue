<template>
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
</template>

<script>

export default {
  name: 'TheFilters',
  data () {
    return {
      // Фильтр, показыающий все элементы ДОЛЖЕН быть первым в массиве
      filters: ['Всё', 'Разработка', 'Интернет-маркетинг', 'Графический дизайн', 'Мобильные приложения'],
      filterLineWidth: 0,
      filterLineLeft: 0,
      filterLineTop: 0
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
