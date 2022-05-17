<template>
  <div>
    <h3 v-if="title">
      {{ title }}
    </h3>
    <div class="autogrid">
      <img v-for="item in items" :key="item" :src="require('@/assets/img/' + item)" :alt="item">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheImagesBlock',
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
