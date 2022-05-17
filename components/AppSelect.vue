<template>
  <div class="select" :class="addClass" @click="opened = !opened">
    <input :value="value" type="hidden" :name="name">
    <span class="select__text">{{ value !== '' ? value : label }}</span>
    <ul class="select__options customScroll">
      <li v-for="(item, i) in options" :key="i" @click="$emit('input', item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'AppSelect',
  props: {
    options: {
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
    },
    label: {
      type: String,
      default: 'Не выбрано'
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    addClass () {
      const className = []
      this.error ? className.push('error') : className.filter(function (f) { return f !== 'error' })
      this.opened ? className.push('opened') : className.filter(function (f) { return f !== 'opened' })
      return className
    }
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  display: flex;
  &.error .select__text {
    border: 1px solid red;
  }
  &:after {
    transform: rotate(0deg);
    position: absolute;
    z-index: 10;
    top: 40%;
    right: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    font-size: 10px;
    content: '▼';
    color: grey;
    transition: all 0.2s ease-in-out;
  }
  &__text {
    height: 50px;
    display: inline-block;
    padding: 0 18px;
    background-color: #fff;
    border: 1px solid #ccc;
    max-width: 100%;
    border: 1px solid #bdc2c7;
    position: relative;
    display: block;
    width: 100%;
    user-select: none;
    cursor: pointer;
    color: #313133;
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
    text-align: left;
  }
  &__options {
    border: 1px solid #bdc2c7;
    border-top: none;
    border-bottom: none;
    background: #fff;
    max-height: 0;
    overflow-y: auto;
    list-style: none;
    position: absolute;
    z-index: 100;
    display: block;
    width: 100%;
    margin: 0;
    padding-left: 0;
    top: 49px;
    transition: max-height 0.3s ease-in-out;
    li {
      border-top: 1px solid #bdc2c7;
      display: block;
      padding: 0 20px;
      font-size: 14px;
      line-height: 48px;
      cursor: pointer;
      overflow: hidden;
      text-align: left;
      color: #313133;
      font-size: 16px;
      font-weight: 400;
      transition: .2s;
      &:hover {
        background: #f1f1f1;
      }
      &:last-child {
        border-bottom: 1px solid #bdc2c7;
      }
    }
  }
  &.opened {
    .select__options {
      max-height: 360px;
    }
    &:after {
      transform: rotate(180deg);
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
