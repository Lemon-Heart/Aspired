<template>
  <label class="flex">
    <textarea class="customScroll" :value="value" :placeholder="label" :name="name" @input="onInput" />
  </label>
</template>

<script>

export default {
  name: 'AppTextarea',
  props: {
    label: {
      type: String,
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
  data () {
    return {
      opened: false
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
