<template>
  <div class="errorLayout">
    <div class="errorLayout__body">
      <h1 v-if="error.statusCode === 404">
        Страница не найдена
      </h1>
      <p v-if="error.statusCode === 404">
        Страница, которую вы ищете, не найдена или еще не создана<br>
        Предлагаем вернуться на главную
      </p>
      <h1 v-else style="margin-bottom: 20px">
        {{ otherError }}
      </h1>
      <img v-if="error.statusCode === 404" src="@/assets/404.png" alt="error404">
      <NuxtLink class="btn" to="/">
        На главную
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      otherError: 'Произошла ошибка',
      pageNotFound: 'Страница не найдена'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
