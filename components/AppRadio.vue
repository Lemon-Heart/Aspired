<template>
  <label class="label-radio">
    <input :value="text" type="radio" :name="name" :checked="value === text" @input="onInput">
    <span class="label-radio__fake" />
    <span class="label">{{ text }}</span>
  </label>
</template>

<script>

export default {
  name: 'AppRadio',
  props: {
    text: {
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
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.label-radio {
  position: relative;
  display: flex;
  align-items: center;
  &__fake {
    content: '';
    width: 26px;
    height: 26px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
  }
  input {
    display: none;
  }
  input:checked + span:before {
    content: '';
    width: 24px;
    height: 24px;
    background: radial-gradient(circle, #e35b29 45%, white 50%);
    display: inline-block;
    border-radius: 50%;
  }
}
</style>
