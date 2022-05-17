<template>
  <div>
    <h3 class="mt30" v-if="title">
      {{ title }}
    </h3>
    <div class="counters mb30">
      <AppCounter v-for="(item, n) in items" :key="n" :max="item.max" :text="item.text" :parent="parent" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCountersBlock',
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    parent: {}
  }
}
</script>
