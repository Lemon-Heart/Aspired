<template>
  <div class="form-complete flex flex-col grid-margin-bot-10">
    <transition-group name="slideToBot" tag="div">
      <div v-if="messageBlock.loading && getLoading" :key="'loading'" class="grid-margin-bot-10">
        <div v-html="getLoading.text" />
      </div>
      <div v-if="messageBlock.succes && getSucces" :key="'succes'" class="grid-margin-bot-10">
        <img v-if="getSucces.img" :src="require(`@/assets/img/${getSucces.img}`)" alt="">
        <div v-html="getSucces.text" />
      </div>
      <div v-if="messageBlock.error && getError" :key="'error'" class="grid-margin-bot-10">
        <div v-html="getError.text" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FormComplete',
  props: {
    message: {
      type: String,
      default: 'loading'
    }
  },
  data () {
    return {
      messageBlock: {
        loading: false,
        error: false,
        succes: false
      }
    }
  },
  computed: {
    ...mapGetters('modal', ['getLoading', 'getError', 'getSucces'])
  },
  watch: {
    message (nw, ow) {
      this.$set(this.messageBlock, nw, true)
      this.$set(this.messageBlock, ow, false)
    }
  },
  mounted () {
    this.$set(this.messageBlock, this.message, true)
  },
  beforeDestroy () {
    this.$set(this.messageBlock, this.message, false)
    this.$set(this.messageBlock, 'loading', true)
    this.sendMessage('succes')
  },
  methods: {
    ...mapMutations('modal', ['toggleModal', 'sendMessage'])
  }
}
</script>
