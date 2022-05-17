<template>
  <div>
    <span class="placeholder mb10">{{ label }}</span>
    <div class="flex left">
      <AppRadio
        v-for="(item, radioItem) in text"
        :key="radioItem"
        :value="value"
        :name="name"
        :text="item"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'RadioCluster',
  props: {
    label: {
      type: String,
      required: true
    },
    text: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    }
  }
}
</script>
