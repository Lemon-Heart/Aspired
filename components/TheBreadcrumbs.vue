<template>
  <div class="breadcrumbs">
    <NuxtLink to="/" class="breadcrumbs__item">
      Главная
    </NuxtLink>
    <NuxtLink v-for="item in items" :key="item.name" class="breadcrumbs__item" :to="item.path.split(':', 1)[0]">
      {{ item.name }}
    </NuxtLink>
    <a v-if="$route.params.name" :key="$route.params.name" class="breadcrumbs__item">
      {{ $route.params.name }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',
  data () {
    return {
      items: this.$route.matched
    }
  }
}
</script>
