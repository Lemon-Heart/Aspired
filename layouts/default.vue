<template>
  <div class="root">
    <TheAside
      :sidebar-full="sidebarFull"
      :mini-variant="miniVariant"
      :index-page="indexPage"
      @toogleSidebarFull="sidebarFull = !sidebarFull"
      @setLargeSidebar="setLargeSidebar"
      @setSmallSidebar="setSmallSidebar"
    />
    <Nuxt :class="{'content--translate': !miniVariant}" />
    <button class="briefButton" :class="{'briefButton--portfolio': $route.name === 'Портфолио'}" @click="$modal.show('brief')">
      <penIcon />
    </button>
    <client-only>
      <modal :max-width="950" width="100%" name="brief">
        <div slot="top-right" class="close" @click="$modal.hide('brief')">
          ✖
        </div>
        <ModalBrief />
      </modal>
    </client-only>
    <transition name="message">
      <form-complete v-if="getFormCompleteVisible" :key="'form-complete'" :message="getMessage" />
    </transition>
    <!-- <ThePreload :visible="preload" @hidePreload="preload = false" /> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import penIcon from '~/assets/icons/pen.svg?inline'

export default {
  name: 'DefaultLayout',
  components: { penIcon },
  data () {
    return {
      // preload: false,
      indexPage: false,
      miniVariant: true,
      sidebarFull: false
    }
  },
  computed: {
    ...mapGetters('modal', ['getFormCompleteVisible', 'getMessage'])
  },
  watch: {
    $route () {
      this.$modal.hide('brief')
      this.sidebarFull = false
      // this.preload = true
      this.checkOnIndexPage()
    },
    sidebarFull (newValue, oldValue) {
      if (newValue === true) {
        this.setLargeSidebar()
      } else {
        this.setSmallSidebar()
      }
    }
  },
  mounted () {
    this.checkOnIndexPage()
  },
  methods: {
    ...mapMutations('menu', ['closeAllSubmenu']),
    setSmallSidebar () {
      if (!this.sidebarFull) {
        this.miniVariant = true
        this.closeAllSubmenu()
      }
    },
    setLargeSidebar () {
      this.miniVariant = false
    },
    checkOnIndexPage () {
      this.$route.path === '/' ? this.indexPage = true : this.indexPage = false
    }
  }
}
</script>
