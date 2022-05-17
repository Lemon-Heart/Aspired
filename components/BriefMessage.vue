<template>
  <div v-if="messageVisible" :key="'brief__message'" class="brief__message">
    <transition-group name="slideToBot" mode="out-in">
      <span v-for="item in message" v-show="item.visible" :key="item.text">{{ item.text }}</span>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'BriefMessage',
  props: {
    messageVisible: {
      type: Boolean,
      default: false
    },
    message: {
      type: [Object, Array],
      required: true
    }
  }
}
</script>
