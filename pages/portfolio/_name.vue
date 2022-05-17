<template>
  <SplitScreenLayout>
    <template #left>
      <img v-if="portfolio.img" :src="require('~/assets/img/' + portfolio.img )" class="portfolio-image" :alt="$route.params.name">
    </template>
    <template #right>
      <h2 v-if="portfolio.task" class="upper">
        Задача
      </h2>
      <p v-if="portfolio.task">
        {{ portfolio.task }}
      </p>
      <h2 v-if="portfolio.process">
        Процесс
      </h2>
      <p v-if="portfolio.process">
        {{ portfolio.process }}
      </p>
      <ul v-if="portfolio.ul" class="grid-margin-bot-10 mb30">
        <li v-for="(li, i) in portfolio.ul" :key="i">
          <h3>{{ li.title }}</h3>
          <p>{{ li.li }}</p>
        </li>
      </ul>
      <p v-if="portfolio.end">
        {{ portfolio.end }}
      </p>
      <a v-if="portfolio.link" target="blank" :href="portfolio.link">Ссылка на клиента</a>
    </template>
  </SplitScreenLayout>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'

export default {
  name: 'PortfolioDetailPage',
  components: { SplitScreenLayout },
  async asyncData (context) {
    const portfolio = await context.$http.$get(`/mock/portfolioDetail/${context.params.name}.json`)
    return { portfolio }
  }
}
</script>

<style scoped lang="scss">
  h3 {
    margin-bottom: 0!important;
  }
  .portfolio-image {
    height: auto!important;
    flex: auto;
  }
</style>
