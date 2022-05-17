<template>
  <div class="drop-down-list flex flex-col" :class="addClass" @click="opened = !opened">
    <span class="drop-down-list__title flex s-b">
      <span>{{ title }}</span>
      <component :is="opened ? 'minusIcon' : 'plusIcon'" />
    </span>
    <div class="drop-down-list__body customScroll" v-html="body" />
  </div>
</template>

<script>
import plusIcon from '~/assets/icons/plus.svg?inline'
import minusIcon from '~/assets/icons/minus.svg?inline'

export default {
  name: 'AppDropDownList',
  components: { plusIcon, minusIcon },
  props: {
    body: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
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
      this.opened ? className.push('opened') : className.filter(function (f) { return f !== 'opened' })
      return className
    }
  }
}
</script>

<style scoped lang="scss">
.drop-down-list {
  position: relative;
  display: flex;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &:hover {
    .drop-down-list__title {
      color: #df5a29;
    }
  }
  &__title {
    width: 100%;
    transition: 0.2s;
    align-items: center;
    span {
      padding-right: 10px;
      z-index: 10;
      font-size: 19px;
      background: #fff;
      font-weight: bold;
      font-family: 'Roboto Slab';
    }
    &:before {
      content: '';
      position: absolute;
      height: 0.9px;
      right: 20px;
      top: 50%;
      width: calc(100% - 20px);
      background: #bfbfbf;
      transition: 0.5s .35s linear;
    }
    svg {
      fill: #df5a29;
      transition: 0.5s cubic-bezier(0.96, 0.73, 0.52, 0.65);
      transform: rotate(-270deg);
      z-index: 10;
    }
  }
  &__body {
    background: #fff;
    max-height: 0;
    top: 10px;
    overflow-y: hidden;
    position: relative;
    z-index: 100;
    display: block;
    width: 100%;
    padding: 0 20px;
    line-height: 26px;
    transition-duration: 0.4s;
    transition-delay: 0s;
    &:before {
      content: '';
      position: absolute;
      width: 1px;
      right: 5.5px;
      top: -8px;
      height: 0;
      background: #bfbfbf;
      transition: 0.2s .15s linear;
    }
  }
  &.opened {
    .drop-down-list__title {
      &:before {
        width: 0;
        transition: .2s linear;
      }
    }
    .drop-down-list__body {
      max-height: 360px;
      transition: all 0.7s cubic-bezier(0.96, 0.73, 0.52, 0.65);
      &:before {
        height: 100%;
      }
    }
    svg {
      transition: 0.4s cubic-bezier(0.96, 0.73, 0.52, 0.65);
      transform: rotate(0deg);
    }
  }
}
</style>
